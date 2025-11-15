import type { Campaign } from '@/types/domain/campaing';

export type HomeCampaignSectionProps = {
  campaigns: Campaign[];
  title?: string;
  showSeeAll?: boolean;
  onCampaignPress?: (campaign: Campaign) => void;
  onSeeAllPress?: () => void;
};
