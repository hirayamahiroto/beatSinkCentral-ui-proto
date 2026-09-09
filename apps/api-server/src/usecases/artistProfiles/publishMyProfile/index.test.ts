import { describe, it, expect, vi, beforeEach } from "vitest";
import { reconstructArtistProfile } from "../../../domain/artistProfiles/factories";
import { publishMyProfile } from "./index";
import type { ArtistProfile } from "../../../domain/artistProfiles/entities";
import type { IArtistProfileWriter } from "../../../domain/artistProfiles/repositories";
import type { ArtistProfileWriteCapabilities } from "../../../capabilities";

const publishableProfile = (published = false) =>
  reconstructArtistProfile({
    id: "profile-1",
    artistId: "artist-1",
    published,
    name: "Taro",
    imageUrl: "https://example.com/a.png",
    chapters: [{ questionCode: "beginning", body: "私の歩み" }],
    genres: ["bass"],
    links: [{ linkTypeCode: "x", url: "https://x.com/taro" }],
  });

const createCaps = (profile: ArtistProfile) =>
  ({
    profile,
    artistProfiles: {
      upsert: vi.fn<IArtistProfileWriter["upsert"]>(),
      setPublished: vi.fn<IArtistProfileWriter["setPublished"]>(),
    },
  }) satisfies Pick<
    ArtistProfileWriteCapabilities,
    "profile" | "artistProfiles"
  >;

describe("publishMyProfile", () => {
  beforeEach(() => vi.clearAllMocks());

  it("最小核が揃っていれば公開でき、ok(published=true) を返す", async () => {
    const caps = createCaps(publishableProfile());
    caps.artistProfiles.setPublished.mockResolvedValue(
      publishableProfile(true),
    );

    const result = await publishMyProfile(caps, { published: true });

    expect(result).toStrictEqual({ ok: true, value: { published: true } });
    expect(caps.artistProfiles.setPublished).toHaveBeenCalledExactlyOnceWith({
      artistId: "artist-1",
      published: true,
    });
  });

  it("最小核が欠けている状態で公開しようとすると err(ProfileNotPublishableError)", async () => {
    const caps = createCaps(
      reconstructArtistProfile({
        id: "profile-1",
        artistId: "artist-1",
        published: false,
        name: "Taro",
        links: [],
      }),
    );

    const result = await publishMyProfile(caps, { published: true });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.type).toBe("ProfileNotPublishableError");
      expect(result.error).toMatchObject({
        missingFields: ["imageUrl", "story", "genres", "links"],
      });
    }
    expect(caps.artistProfiles.setPublished).not.toHaveBeenCalled();
  });

  it("非公開化は最小核を検証せず常に可能", async () => {
    const caps = createCaps(
      reconstructArtistProfile({
        id: "profile-1",
        artistId: "artist-1",
        published: true,
        name: "Taro",
      }),
    );
    caps.artistProfiles.setPublished.mockResolvedValue(
      reconstructArtistProfile({
        id: "profile-1",
        artistId: "artist-1",
        published: false,
        name: "Taro",
      }),
    );

    const result = await publishMyProfile(caps, { published: false });

    expect(result).toStrictEqual({ ok: true, value: { published: false } });
  });
});
