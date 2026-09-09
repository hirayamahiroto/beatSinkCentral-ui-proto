import type { ArtistProfileView } from "../../../domain/artistProfiles/entities";
import { toView } from "../../../domain/artistProfiles/behaviors";
import {
  assessPublishability,
  type Publishability,
} from "../../../domain/artistProfiles/policies/publishability";
import type { ArtistReadCapabilities } from "../../../capabilities";
import { type Result, ok } from "../../../utils/result";

export type GetMyProfileOutput = {
  handle: string;
  profile: ArtistProfileView | null;
  publishability: Publishability | null;
};

type GetMyProfileCaps = Pick<
  ArtistReadCapabilities,
  "actor" | "artistProfiles"
>;

export const getMyProfile = async (
  caps: GetMyProfileCaps,
): Promise<Result<GetMyProfileOutput, never>> => {
  const handle = caps.actor.artist.getHandle();
  const state = await caps.artistProfiles.load(caps.actor.artist.getArtistId());

  switch (state.kind) {
    case "noProfile":
      return ok({ handle, profile: null, publishability: null });

    case "draft":
      return ok({
        handle,
        profile: toView(state),
        publishability: assessPublishability(state.content),
      });

    case "published":
      return ok({
        handle,
        profile: toView(state),
        publishability: { ok: true, missingFields: [] },
      });
  }
};
