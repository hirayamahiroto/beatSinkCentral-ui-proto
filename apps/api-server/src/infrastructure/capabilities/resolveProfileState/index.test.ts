import { describe, it, expect, vi } from "vitest";
import { resolveProfileState } from "./index";
import { reconstructArtistProfile } from "../../../domain/artistProfiles/factories";
import type { ArtistProfile } from "../../../domain/artistProfiles/entities";
import type { IArtistProfileReader } from "../../../domain/artistProfiles/repositories";

const createReader = (found: ArtistProfile | null) => ({
  findByArtistId: vi.fn<IArtistProfileReader["findByArtistId"]>(
    async () => found,
  ),
  findPublishedByHandle: vi.fn<IArtistProfileReader["findPublishedByHandle"]>(
    async () => null,
  ),
  listPublishedSummaries: vi.fn<IArtistProfileReader["listPublishedSummaries"]>(
    async () => [],
  ),
});

describe("resolveProfileState", () => {
  it("artistId で引いて無ければ noProfile", async () => {
    const reader = createReader(null);

    const resolution = await resolveProfileState(reader, "artist-1");

    expect(reader.findByArtistId).toHaveBeenCalledExactlyOnceWith("artist-1");
    expect(resolution).toStrictEqual({ status: "noProfile" });
  });

  it("あれば existing として Entity をそのまま返す", async () => {
    const profile = reconstructArtistProfile({
      id: "profile-1",
      artistId: "artist-1",
      published: false,
      name: "Taro",
    });
    const reader = createReader(profile);

    const resolution = await resolveProfileState(reader, "artist-1");

    expect(resolution).toStrictEqual({ status: "existing", profile });
  });
});
