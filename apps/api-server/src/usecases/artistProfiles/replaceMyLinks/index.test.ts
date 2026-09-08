import { describe, it, expect, vi, beforeEach } from "vitest";
import { replaceMyLinks } from "./index";
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

const publishedContent = {
  id: "profile-existing",
  artistId: "artist-1",
  published: true,
  name: "Taro",
  imageUrl: "https://example.com/taro.png",
  chapters: [{ questionCode: "beginning", body: "私の歩み" }],
  genres: ["bass"],
  links: [{ linkTypeCode: "x", url: "https://x.com/taro" }],
};

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

describe("replaceMyLinks", () => {
  beforeEach(() => vi.clearAllMocks());

  it("渡された下書きにリンクを保存し、links だけを返す", async () => {
    const caps = createCaps();

    const result = await replaceMyLinks(caps, {
      links: [
        { linkTypeCode: "youtube", url: "https://youtube.com/@taro" },
        { linkTypeCode: "x", url: "https://x.com/taro" },
      ],
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toStrictEqual({
        links: [
          { linkTypeCode: "youtube", url: "https://youtube.com/@taro" },
          { linkTypeCode: "x", url: "https://x.com/taro" },
        ],
      });
    }
    expect(caps.artistProfiles.upsert.mock.calls[0][0].artistId).toBe(
      "artist-1",
    );
  });

  it("既存プロフィールのリンク集合を丸ごと差し替え、他の構造は保持する", async () => {
    const caps = createCaps(reconstructArtistProfile(publishedContent));

    await replaceMyLinks(caps, {
      links: [{ linkTypeCode: "instagram", url: "https://instagram.com/taro" }],
    });
    const persisted = caps.artistProfiles.upsert.mock.calls[0][0];
    expect(persisted.id).toBe("profile-existing");
    expect(persisted.links).toEqual([
      { linkTypeCode: "instagram", url: "https://instagram.com/taro" },
    ]);
    expect(persisted.name).toBe("Taro");
    expect(persisted.chapters).toEqual([
      { questionCode: "beginning", body: "私の歩み" },
    ]);
    expect(persisted.published).toBe(true);
  });

  it("公開中にリンクを全て消したら非公開へ降ろして保存する", async () => {
    const caps = createCaps(reconstructArtistProfile(publishedContent));

    const result = await replaceMyLinks(caps, { links: [] });

    expect(caps.artistProfiles.upsert.mock.calls[0][0].published).toBe(false);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.links).toEqual([]);
  });

  it("不正な url は err(InvalidSnsUrlFormatError)（保存しない）", async () => {
    const caps = createCaps();

    const result = await replaceMyLinks(caps, {
      links: [{ linkTypeCode: "x", url: "not-a-url" }],
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.type).toBe("InvalidSnsUrlFormatError");
    }
    expect(caps.artistProfiles.upsert).not.toHaveBeenCalled();
  });
});
