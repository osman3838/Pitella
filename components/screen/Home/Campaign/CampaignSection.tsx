
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import type { HomeCampaignSectionProps } from '@/types/features/home/Campaign';
import { CampaignHeader } from './CampaignHeader';
import { CampaignList } from './CampaignList';

const CampaignSectionComponent: React.FC<HomeCampaignSectionProps> = ({
  campaigns,
  onCampaignPress,
}) => {
  if (!campaigns || campaigns.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CampaignHeader />
      <CampaignList campaigns={campaigns} onCampaignPress={onCampaignPress} />
    </View>
  );
};

export const CampaignSection = memo(CampaignSectionComponent);

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    marginHorizontal:15,
    paddingBottom: 16,
  },
});
