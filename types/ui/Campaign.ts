
import { ImageSourcePropType } from 'react-native';

export type CampaignCardProps = {
  title: string;

  discountText: string;

  description?: string;

  code?: string;

  expiresAt?: string;

  image?: ImageSourcePropType;

  onPress?: () => void;
};
