import { CampaignCard } from '@/components/ui/cards/CampaingCard';
import type { Campaign } from '@/types';
import React, { memo, useCallback } from 'react';
import {
    Alert,
    FlatList,
    ListRenderItem,
    StyleSheet,
    View,
} from 'react-native';

type Props = {
  campaigns: Campaign[];
  onCampaignPress?: (campaign: Campaign) => void;
};

const CARD_SPACING = 14;

const CampaignListComponent: React.FC<Props> = ({
  campaigns,
  onCampaignPress,
}) => {
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
    [onCampaignPress]
  );

  return (
    <FlatList
      data={campaigns}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

export const CampaignList = memo(CampaignListComponent);

const styles = StyleSheet.create({
  listContent: {
    paddingRight: CARD_SPACING,
  },
  cardWrapper: {
    width: 280,
    marginRight: CARD_SPACING,
  },
});
