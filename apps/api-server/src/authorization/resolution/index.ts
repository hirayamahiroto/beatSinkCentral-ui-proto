import type {
  Actor,
  ActorResolution,
  ProfileResolution,
  ResolveActorError,
  ResolveUserError,
} from "../../capabilities";
import type { User } from "../../domain/users/entities";
import type { ArtistProfile } from "../../domain/artistProfiles/entities";
import { createDraftArtistProfile } from "../../domain/artistProfiles/factories";
import { createUserNotFoundError } from "../../domain/users/errors/userNotFound";
import { createArtistNotFoundError } from "../../domain/artists/errors/artistNotFound";
import {
  createArtistProfileNotFoundError,
  type ArtistProfileNotFoundError,
} from "../../domain/artistProfiles/errors/artistProfileNotFound";
import { type Result, ok, err } from "../../utils/result";

const toActor = (
  resolution: ActorResolution,
): Result<Actor, ResolveActorError> => {
  switch (resolution.status) {
    case "unregistered":
      return err(createUserNotFoundError());
    case "userOnly":
      return err(createArtistNotFoundError());
    case "complete":
      return ok(resolution.actor);
  }
};

export const toAddressedActor = (
  resolution: ActorResolution,
  artistId: string,
): Result<Actor, ResolveActorError> => {
  const actor = toActor(resolution);
  if (!actor.ok) return actor;
  if (actor.value.artist.getArtistId() !== artistId) {
    return err(createArtistNotFoundError());
  }
  return actor;
};

const toUser = (
  resolution: ActorResolution,
): Result<User, ResolveUserError> => {
  switch (resolution.status) {
    case "unregistered":
      return err(createUserNotFoundError());
    case "userOnly":
      return ok(resolution.user);
    case "complete":
      return ok(resolution.actor.user);
  }
};

export const toAddressedUser = (
  resolution: ActorResolution,
  userId: string,
): Result<User, ResolveUserError> => {
  const user = toUser(resolution);
  if (!user.ok) return user;
  if (user.value.getId() !== userId) {
    return err(createUserNotFoundError());
  }
  return user;
};

export const toEditableProfile = (
  resolution: ProfileResolution,
  artistId: string,
): ArtistProfile => {
  switch (resolution.status) {
    case "noProfile":
      return createDraftArtistProfile({ artistId });
    case "existing":
      return resolution.profile;
  }
};

export const toExistingProfile = (
  resolution: ProfileResolution,
): Result<ArtistProfile, ArtistProfileNotFoundError> => {
  switch (resolution.status) {
    case "noProfile":
      return err(createArtistProfileNotFoundError());
    case "existing":
      return ok(resolution.profile);
  }
};
