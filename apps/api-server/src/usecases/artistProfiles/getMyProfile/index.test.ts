import { describe, it, expect, vi, beforeEach } from "vitest";
import { getMyProfile } from "./index";
import { reconstructStoredProfile } from "../../../domain/artistProfiles/factories";
import type { ProfileState } from "../../../domain/artistProfiles/entities";
import type { IArtistProfileReader } from "../../../domain/artistProfiles/repositories";
import type { ArtistReadCapabilities } from "../../../capabilities";
import { testUser, testArtist } from "../../../authorization/testDoubles";

const actor = { user: testUser, artist: testArtist };

const createCaps = (state: ProfileState) =>
  ({
    actor,
    artistProfiles: {
      load: vi.fn<IArtistProfileReader["load"]>(async () => state),
      findPublishedByHandle: vi.fn<
        IArtistProfileReader["findPublishedByHandle"]
      >(async () => null),
      listPublishedSummaries: vi.fn<
        IArtistProfileReader["listPublishedSummaries"]
      >(async () => []),
    },
  }) satisfies ArtistReadCapabilities;

describe("getMyProfile", () => {
  beforeEach(() => vi.clearAllMocks());

  it("プロフィール未作成なら profile と publishability を null で返す", async () => {
    const caps = createCaps({ kind: "noProfile", artistId: "artist-1" });

    const result = await getMyProfile(caps);

    expect(result).toStrictEqual({
      ok: true,
      value: { handle: "user_123", profile: null, publishability: null },
    });
    expect(caps.artistProfiles.load).toHaveBeenCalledExactlyOnceWith(
      "artist-1",
    );
  });

  it("下書きは集約の構造（attributes / story / links / published）と不足項目を返す", async () => {
    const caps = createCaps(
      reconstructStoredProfile({
        id: "profile-1",
        artistId: "artist-1",
        published: false,
        name: "Taro",
        chapters: [{ questionCode: "beginning", body: "始めたきっかけ。" }],
        genres: ["Beatbox"],
        links: [{ linkTypeCode: "youtube", url: "https://youtube.com/@taro" }],
      }),
    );

    const result = await getMyProfile(caps);

    expect(result).toStrictEqual({
      ok: true,
      value: {
        handle: "user_123",
        profile: {
          attributes: {
            name: "Taro",
            imageUrl: null,
            tagline: null,
            genres: ["Beatbox"],
            activityInfo: null,
          },
          story: { chapters: [{ key: "beginning", body: "始めたきっかけ。" }] },
          links: [
            { linkTypeCode: "youtube", url: "https://youtube.com/@taro" },
          ],
          presentation: { patternCode: null },
          published: false,
        },
        publishability: { ok: false, missingFields: ["imageUrl"] },
      },
    });
  });

  it("公開中は publishability.ok が true で missingFields は空", async () => {
    const caps = createCaps(
      reconstructStoredProfile({
        id: "profile-1",
        artistId: "artist-1",
        published: true,
        name: "Taro",
        imageUrl: "https://example.com/taro.jpg",
        chapters: [{ questionCode: "beginning", body: "始めたきっかけ。" }],
        genres: ["Beatbox"],
        links: [{ linkTypeCode: "youtube", url: "https://youtube.com/@taro" }],
      }),
    );

    const result = await getMyProfile(caps);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.profile?.published).toBe(true);
      expect(result.value.publishability).toStrictEqual({
        ok: true,
        missingFields: [],
      });
    }
  });
});
