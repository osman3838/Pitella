import type { SectionChip } from '@/types/ui/section';

export type CategoryItem = {
  id: string | number;
  title: string;
  tags?: string[];
};

export type UseCategoryOptions = {
  chips?: SectionChip[];
  initialKey?: string;
  items?: CategoryItem[];
  query?: string;
};

export type UseCategoryReturn = {
  activeKey: string;
  setActiveKey: (key: string) => void;
  chips: SectionChip[];
  onChipChange: (key: string) => void;
  items: CategoryItem[];
  total: number;
};
