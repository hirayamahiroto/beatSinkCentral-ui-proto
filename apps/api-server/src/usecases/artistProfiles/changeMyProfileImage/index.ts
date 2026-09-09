import {
  createImageUrl,
  type InvalidImageUrlFormatError,
} from "../../../domain/artistProfiles/valueObjects/imageUrl";
import type { ArtistProfileWriteCapabilities } from "../../../capabilities";
import { persistMyProfile } from "../persistMyProfile";
import { type Result, ok } from "../../../utils/result";

export type ChangeMyProfileImageInput = {
  imageUrl: string;
};

export type ChangeMyProfileImageOutput = {
  imageUrl: string;
};

export type ChangeMyProfileImageError = InvalidImageUrlFormatError;

type ChangeMyProfileImageCaps = Pick<
  ArtistProfileWriteCapabilities,
  "profile" | "artistProfiles"
>;

export const changeMyProfileImage = async (
  caps: ChangeMyProfileImageCaps,
  input: ChangeMyProfileImageInput,
): Promise<Result<ChangeMyProfileImageOutput, ChangeMyProfileImageError>> => {
  const imageUrl = createImageUrl(input.imageUrl);
  if (!imageUrl.ok) return imageUrl;

  await persistMyProfile(caps, caps.profile.changeImage(imageUrl.value));

  return ok({ imageUrl: imageUrl.value.value });
};
