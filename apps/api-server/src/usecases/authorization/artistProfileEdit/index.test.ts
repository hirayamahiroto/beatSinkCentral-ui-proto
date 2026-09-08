import { describe, it, expect } from "vitest";
import { withArtistProfileEditCapabilitiesById } from "./index";
import {
  createCapabilityDepsStub,
  testUser as user,
  testArtist as artist,
  testDraftProfile as profile,
} from "../testDoubles";
import { ok } from "../../../utils/result";

describe("withArtistProfileEditCapabilitiesById", () => {
  it("未登録なら境界を張らず UserNotFoundError を返す", async () => {
    const { deps, calls } = createCapabilityDepsStub({
      status: "unregistered",
    });

    const result = await withArtistProfileEditCapabilitiesById(
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

  it("パスの artistId が一致しなければ境界を張らず ArtistNotFoundError を返す", async () => {
    const { deps, calls } = createCapabilityDepsStub({
      status: "complete",
      actor: { user, artist },
    });

    const result = await withArtistProfileEditCapabilitiesById(
      deps,
      "auth0|123",
      "other-artist",
      async () => ok("called"),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.type).toBe("ArtistNotFoundError");
    }
    expect(calls.artistProfileWriteBoundaries).toBe(0);
  });

  it("プロフィールが無ければ境界の中で下書きを作って渡す", async () => {
    const { deps, calls } = createCapabilityDepsStub(
      { status: "complete", actor: { user, artist } },
      { status: "noProfile" },
    );

    const result = await withArtistProfileEditCapabilitiesById(
      deps,
      "auth0|123",
      "artist-1",
      async (caps) =>
        ok({
          artistId: caps.profile.getArtistId(),
          published: caps.profile.isPublished(),
          name: caps.profile.getName(),
          keys: Object.keys(caps).sort(),
        }),
    );

    expect(result).toStrictEqual(
      ok({
        artistId: "artist-1",
        published: false,
        name: null,
        keys: ["actor", "artistProfiles", "profile"],
      }),
    );
    expect(calls.artistProfileWriteBoundaries).toBe(1);
  });

  it("プロフィールがあればそれをそのまま渡す", async () => {
    const { deps } = createCapabilityDepsStub(
      { status: "complete", actor: { user, artist } },
      { status: "existing", profile },
    );

    const result = await withArtistProfileEditCapabilitiesById(
      deps,
      "auth0|123",
      "artist-1",
      async (caps) => ok(caps.profile),
    );

    expect(result).toStrictEqual(ok(profile));
  });
});
