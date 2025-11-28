import { CampaignCard } from '@/components/ui/cards/CampaingCard';
import type { Campaign } from '@/types';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';

type Props = {
  campaigns: Campaign[];
  onCampaignPress?: (campaign: Campaign) => void;
};

export type CampaignListHandle = {
  scrollNext: () => void;
};

const CARD_SPACING = 14;
const CARD_WIDTH = 280;
const TOTAL_WIDTH = CARD_WIDTH + CARD_SPACING;

const CampaignListInner = (
  { campaigns, onCampaignPress }: Props,
  ref: React.Ref<CampaignListHandle>,
) => {
  const listRef = useRef<FlatList<Campaign>>(null);
  const currentIndexRef = useRef(0);

  useImperativeHandle(
    ref,
    () => ({
      scrollNext() {
        if (!campaigns || campaigns.length === 0) return;

        const nextIndex = Math.min(
          currentIndexRef.current + 1,
          campaigns.length - 1,
        );

        // İlerleyebilecek bir yer yoksa boşuna uğraşma
        if (nextIndex === currentIndexRef.current) return;

        listRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        currentIndexRef.current = nextIndex;
      },
    }),
    [campaigns],
  );

  const renderItem: ListRenderItem<Campaign> = useCallback(
    ({ item }) => (
      <View style={styles.cardWrapper}>
        <CampaignCard
          title={item.title}
          discountText={item.discountText}
          description={item.description}
          code={item.code}
          expiresAt={item.expiresAt}
          image={item.image}
          onPress={() => onCampaignPress?.(item)}
        />
      </View>
    ),
    [onCampaignPress],
  );

  return (
    <FlatList
      ref={listRef}
      data={campaigns}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      getItemLayout={(_, index) => ({
        length: TOTAL_WIDTH,
        offset: TOTAL_WIDTH * index,
        index,
      })}
    />
  );
};

export const CampaignList = memo(
  forwardRef<CampaignListHandle, Props>(CampaignListInner),
);

const styles = StyleSheet.create({
  listContent: {
    paddingRight: CARD_SPACING,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
  },
});
