import { ImageSourcePropType } from 'react-native';

export type Campaign = {
  id: string;
  title: string;
  discountText: string;
  description?: string;
  code?: string;
  expiresAt?: string;
  image?: ImageSourcePropType;
};

export type CampaignCardProps = Omit<Campaign, 'id'> & {
  onPress?: () => void;
};

export type HomeCampaignsSectionProps = {
  campaigns: Campaign[];
  title?: string;
  showSeeAll?: boolean;
  onCampaignPress?: (campaign: Campaign) => void;
  onSeeAllPress?: () => void;
};
