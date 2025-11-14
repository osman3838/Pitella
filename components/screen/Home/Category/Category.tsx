import { useCategory } from '@/hooks/category/useCategory';
import type { SectionChip } from '@/types/ui/section';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import PartialsCardItem from './Partials/CardItem';
import PartialsChips from './Partials/Chips';
import PartialsSection from './Partials/Section';
import PartialsCarouselList from './Partials/CarouselList';

type Item = { id: string | number; title: string; tags?: string[]; image?: any; price?: number };

export default function Category({
  title,
  chips = [],
  data = [],
  rightExtra,
}: {
  title: string;
  chips?: SectionChip[];
  data?: Item[];
  rightExtra?: React.ReactNode;
}) {
  const { chips: uiChips, onChipChange, items } = useCategory({ chips, items: data });

  return (
    <View style={s.wrap}>
      <PartialsSection
        title={title}
        rightExtra={rightExtra}
        renderChips={() => <PartialsChips items={uiChips} onChange={onChipChange} />}
      />
      <PartialsCarouselList
        data={items}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => <PartialsCardItem item={item} />}
      />
    </View>
  );
}
const s = StyleSheet.create({ wrap: { gap: 8 } });
