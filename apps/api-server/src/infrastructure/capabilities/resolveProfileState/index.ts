import type { IArtistProfileReader } from "../../../domain/artistProfiles/repositories";
import type { ProfileResolution } from "../../../capabilities";

export const resolveProfileState = async (
  reader: IArtistProfileReader,
  artistId: string,
): Promise<ProfileResolution> => {
  const profile = await reader.findByArtistId(artistId);
  if (!profile) return { status: "noProfile" };

  return { status: "existing", profile };
};
