import type {
  CapabilityDeps,
  ResolveActorError,
  ArtistProfileWriteCapabilities,
} from "../../capabilities";
import type { ArtistProfileNotFoundError } from "../../../domain/artistProfiles/errors/artistProfileNotFound";
import { toAddressedActor, toExistingProfile } from "../resolution";
import type { Result } from "../../../utils/result";

export const withArtistProfilePublishCapabilitiesById = async <T, E>(
  deps: CapabilityDeps,
  subId: string,
  artistId: string,
  work: (caps: ArtistProfileWriteCapabilities) => Promise<Result<T, E>>,
): Promise<Result<T, E | ResolveActorError | ArtistProfileNotFoundError>> => {
  const actor = toAddressedActor(await deps.resolveActorState(subId), artistId);
  if (!actor.ok) return actor;

  return deps.runWithArtistProfileResolutionCapabilities<
    T,
    E | ArtistProfileNotFoundError
  >(actor.value, async (caps) => {
    const profile = toExistingProfile(caps.profileResolution);
    if (!profile.ok) return profile;

    return work({
      actor: caps.actor,
      profile: profile.value,
      artistProfiles: caps.artistProfiles,
    });
  });
};
