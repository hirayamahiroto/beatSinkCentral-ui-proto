import type {
  CapabilityDeps,
  ResolveActorError,
  ArtistProfileWriteCapabilities,
} from "../../capabilities";
import { toAddressedActor, toEditableProfile } from "../resolution";
import type { Result } from "../../utils/result";

export const withArtistProfileEditCapabilitiesById = async <T, E>(
  deps: CapabilityDeps,
  subId: string,
  artistId: string,
  work: (caps: ArtistProfileWriteCapabilities) => Promise<Result<T, E>>,
): Promise<Result<T, E | ResolveActorError>> => {
  const actor = toAddressedActor(await deps.resolveActorState(subId), artistId);
  if (!actor.ok) return actor;

  return deps.runWithArtistProfileResolutionCapabilities(actor.value, (caps) =>
    work({
      actor: caps.actor,
      profile: toEditableProfile(caps.profileResolution, artistId),
      artistProfiles: caps.artistProfiles,
    }),
  );
};
