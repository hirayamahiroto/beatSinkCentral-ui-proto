"use client";

import {
  AudienceArtistProfile,
  getVisibleAudienceStoryChapters,
} from "@ui/design-system/components/organisms/AudienceArtistProfile";
import { track } from "../../../../libs/analytics";
import { useStoryExpansion } from "./hooks/useStoryExpansion";
import { useNotifySubscription } from "./hooks/useNotifySubscription";
import { useStoryScrollTracking } from "./hooks/useStoryScrollTracking";

type Props = Omit<
  React.ComponentProps<typeof AudienceArtistProfile>,
  | "storyExpanded"
  | "onExpandStory"
  | "onChapterEndRef"
  | "onOfferClick"
  | "onSupportClick"
  | "email"
  | "onEmailChange"
  | "subscribed"
  | "onSubmitSubscription"
> & {
  artistId: string;
};

export const PlayerDetailClientAdapter = ({
  artistId,
  storyChapters,
  ...props
}: Props) => {
  const { expanded: storyExpanded, expand: expandStory } = useStoryExpansion({
    onExpand: () => track({ type: "story_expand", artistId }),
  });

  const visibleChapterCount = getVisibleAudienceStoryChapters(
    storyChapters,
    storyExpanded,
  ).length;

  const { registerChapterEndElement } = useStoryScrollTracking({
    chapterCount: storyChapters.length,
    visibleChapterCount,
    onDepthReached: (depth) => track({ type: "story_scroll", artistId, depth }),
  });

  const {
    email,
    setEmail,
    subscribed,
    submit: submitSubscription,
  } = useNotifySubscription({ onSubscribe: () => {} });

  return (
    <AudienceArtistProfile
      {...props}
      storyChapters={storyChapters}
      storyExpanded={storyExpanded}
      onExpandStory={expandStory}
      onChapterEndRef={registerChapterEndElement}
      onOfferClick={() => {}}
      onSupportClick={() => {}}
      email={email}
      onEmailChange={setEmail}
      subscribed={subscribed}
      onSubmitSubscription={submitSubscription}
    />
  );
};
