import ChipGroup from '@/components/Section/ChipGroup/ChipGroup';
import { SectionChip } from '@/types';
import React from 'react';


export default function Chips({
  items,
  onChange,
}: {
  items: SectionChip[];
  onChange?: (key: string) => void;
}) {
  const wired = items.map(c => ({ ...c, onPress: () => onChange?.(c.key) }));
  return <ChipGroup items={wired} />;
}
