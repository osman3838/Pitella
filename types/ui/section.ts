import type { ReactNode } from 'react';

export type SectionChip = {
  key: string;
  label: string;
  onPress?: () => void;
  active?: boolean;
  icon?: string;
};

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  chips?: SectionChip[];
  rightExtra?: ReactNode;    
  sticky?: boolean;
  style?: any;
  renderChips?: (chips: SectionChip[]) => ReactNode;
}
