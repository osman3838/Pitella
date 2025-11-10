import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { ActionItem } from '@/types/ui/cardTypes';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export function CardActions({ items = [] as ActionItem[] }) {
  const { colors } = useTheme();

  if (!items.length) return null;

  return (
    <View style={s.wrap}>
      {items.map(a => (
        <Pressable key={a.key} onPress={a.onPress} disabled={a.disabled} style={[s.btn, { backgroundColor: colors.primary }]}>
          {a.icon && <Icon name={a.icon as any} size={16} color={'#fff'} />}
          {a.label && <AppText size={12} color="onPrimary" weight="semiBold">{a.label}</AppText>}
        </Pressable>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flexDirection: 'row', gap: 8, marginTop: 6 },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10, flex: 1 },
});
