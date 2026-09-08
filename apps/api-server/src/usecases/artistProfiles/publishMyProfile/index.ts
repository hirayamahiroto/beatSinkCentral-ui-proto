import {
  ensurePublishable,
  type ProfileNotPublishableError,
} from "../../../domain/artistProfiles/policies/publishability";
import type { ArtistProfileWriteCapabilities } from "../../capabilities";
import { type Result, ok } from "../../../utils/result";

export type PublishMyProfileInput = {
  published: boolean;
};

export type PublishMyProfileOutput = {
  published: boolean;
};

export type PublishMyProfileError = ProfileNotPublishableError;

type PublishMyProfileCaps = Pick<
  ArtistProfileWriteCapabilities,
  "profile" | "artistProfiles"
>;

export const publishMyProfile = async (
  caps: PublishMyProfileCaps,
  input: PublishMyProfileInput,
): Promise<Result<PublishMyProfileOutput, PublishMyProfileError>> => {
  if (input.published) {
    const publishable = ensurePublishable(caps.profile);
    if (!publishable.ok) return publishable;
  }

  const saved = await caps.artistProfiles.setPublished({
    artistId: caps.profile.getArtistId(),
    published: input.published,
  });

  return ok({ published: saved.isPublished() });
};
