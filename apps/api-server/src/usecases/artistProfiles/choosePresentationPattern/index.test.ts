import { describe, it, expect, vi, beforeEach } from "vitest";
import { choosePresentationPattern } from "./index";
import {
  createDraftArtistProfile,
  reconstructArtistProfile,
} from "../../../domain/artistProfiles/factories";
import type {
  ArtistProfile,
  ArtistProfilePersistenceData,
} from "../../../domain/artistProfiles/entities";
import type { IArtistProfileWriter } from "../../../domain/artistProfiles/repositories";
import type { ArtistProfileWriteCapabilities } from "../../capabilities";

const existingProfile = reconstructArtistProfile({
  id: "profile-existing",
  artistId: "artist-1",
  published: true,
  name: "Taro",
  imageUrl: "https://example.com/taro.png",
  chapters: [{ questionCode: "beginning", body: "私の歩み" }],
  genres: ["bass"],
  links: [{ linkTypeCode: "x", url: "https://x.com/taro" }],
  presentationPatternCode: "interview",
});

const echoUpsert = async (data: ArtistProfilePersistenceData) =>
  reconstructArtistProfile({ ...data });

const createCaps = (
  profile: ArtistProfile = createDraftArtistProfile({ artistId: "artist-1" }),
) =>
  ({
    profile,
    artistProfiles: {
      upsert: vi.fn<IArtistProfileWriter["upsert"]>(echoUpsert),
      setPublished: vi.fn<IArtistProfileWriter["setPublished"]>(),
    },
  }) satisfies Pick<
    ArtistProfileWriteCapabilities,
    "profile" | "artistProfiles"
  >;

describe("choosePresentationPattern", () => {
  beforeEach(() => vi.clearAllMocks());

  it("渡された下書きにパターンを保存し、presentation だけを返す", async () => {
    const caps = createCaps();

    const result = await choosePresentationPattern(caps, {
      patternCode: "editorial",
    });

    expect(result).toStrictEqual({
      ok: true,
      value: { presentation: { patternCode: "editorial" } },
    });
    const persisted = caps.artistProfiles.upsert.mock.calls[0][0];
    expect(persisted.artistId).toBe("artist-1");
    expect(persisted.presentationPatternCode).toBe("editorial");
    expect(persisted.published).toBe(false);
  });

  it("既存プロフィールの他の構造には触らずパターンだけを差し替える", async () => {
    const caps = createCaps(existingProfile);

    const result = await choosePresentationPattern(caps, {
      patternCode: "spotlight",
    });

    expect(result.ok).toBe(true);
    expect(caps.artistProfiles.upsert).toHaveBeenCalledExactlyOnceWith({
      id: "profile-existing",
      artistId: "artist-1",
      name: "Taro",
      tagline: null,
      imageUrl: "https://example.com/taro.png",
      chapters: [{ questionCode: "beginning", body: "私の歩み" }],
      activityInfo: null,
      genres: ["bass"],
      links: [{ linkTypeCode: "x", url: "https://x.com/taro" }],
      presentationPatternCode: "spotlight",
      published: true,
    });
  });

  it("未知のパターンは InvalidPresentationPatternError で拒否し、保存しない", async () => {
    const caps = createCaps();

    const result = await choosePresentationPattern(caps, {
      patternCode: "carousel",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.type).toBe("InvalidPresentationPatternError");
    }
    expect(caps.artistProfiles.upsert).not.toHaveBeenCalled();
  });
});
