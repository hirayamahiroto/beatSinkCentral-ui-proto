import { describe, it, expect, vi } from "vitest";
import { withArtistProfilePublishCapabilitiesById } from "./index";
import {
  createCapabilityDepsStub,
  testUser as user,
  testArtist as artist,
  testDraftProfile as profile,
} from "../testDoubles";
import { ok } from "../../../utils/result";

describe("withArtistProfilePublishCapabilitiesById", () => {
  it("未登録なら境界を張らず UserNotFoundError を返す", async () => {
    const { deps, calls } = createCapabilityDepsStub({
      status: "unregistered",
    });

    const result = await withArtistProfilePublishCapabilitiesById(
      deps,
      "auth0|123",
      "artist-1",
      async () => ok("called"),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.type).toBe("UserNotFoundError");
    }
    expect(calls.artistProfileWriteBoundaries).toBe(0);
  });

  it("プロフィールが無ければ usecase を呼ばず ArtistProfileNotFoundError を返す", async () => {
    const { deps, calls } = createCapabilityDepsStub(
      { status: "complete", actor: { user, artist } },
      { status: "noProfile" },
    );
    const work = vi.fn(async () => ok("called"));

    const result = await withArtistProfilePublishCapabilitiesById(
      deps,
      "auth0|123",
      "artist-1",
      work,
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.type).toBe("ArtistProfileNotFoundError");
    }
    expect(work).not.toHaveBeenCalled();
    expect(calls.artistProfileWriteBoundaries).toBe(1);
  });

  it("プロフィールがあれば既存の Entity を権能に載せて usecase へ渡す", async () => {
    const { deps, calls } = createCapabilityDepsStub(
      { status: "complete", actor: { user, artist } },
      { status: "existing", profile },
    );

    const result = await withArtistProfilePublishCapabilitiesById(
      deps,
      "auth0|123",
      "artist-1",
      async (caps) =>
        ok({ profile: caps.profile, keys: Object.keys(caps).sort() }),
    );

    expect(result).toStrictEqual(
      ok({ profile, keys: ["actor", "artistProfiles", "profile"] }),
    );
    expect(calls.artistProfileWriteBoundaries).toBe(1);
  });
});
