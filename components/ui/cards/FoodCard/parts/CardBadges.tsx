import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { BadgeItem } from '@/types/ui/cardTypes';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export function CardBadges({ items }: { items: BadgeItem[] }) {
  const { colors } = useTheme();

  return (
    <View style={s.wrap}>
      {items.map(it => (
        <Pressable key={it.key} style={[s.item, { backgroundColor: colors.surface }]} onPress={it.onPress}>
          {it.icon && <Icon name={it.icon as any} size={16} color={colors.text} />}
          {it.label && <AppText size={10}>{it.label}</AppText>}
        </Pressable>
      ))}
    </View>
  );
}
const s = StyleSheet.create({
  wrap: { position: 'absolute', top: 8, right: 8, gap: 8 },
  item: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6, alignSelf: 'flex-start' },
});
