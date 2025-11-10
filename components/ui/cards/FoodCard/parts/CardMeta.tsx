import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { PriceInfo } from '@/types/ui/cardTypes';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FoodCardProps } from '@/types/ui/cardTypes';
export function CardMeta({
  title,
  subtitle,
  rating,
  price,
  right,
}: FoodCardProps) {
  const { colors } = useTheme();

  return (
    <View style={{ gap: 6 }}>
      <View style={s.row}>
        <AppText weight="semiBold" size={15} style={{ flex: 1 }} numberOfLines={1}>
          {title}
        </AppText>
        {right}
      </View>

      {!!subtitle && (
        <AppText size={11} color="muted" numberOfLines={1}>
          {subtitle}
        </AppText>
      )}

      <View style={s.row}>
        {!!rating && (
          <View style={s.row}>
            <Icon name="Star" size={14} />
            <AppText size={12} style={{ marginLeft: 4 }}>
              {rating.value.toFixed(1)}
              {!!rating.count && ` (${rating.count})`}
            </AppText>
          </View>
        )}

        {!price?.hidden && (
          <AppText size={14} weight="bold" style={{ marginLeft: 'auto' }}>
            {typeof price?.value === 'number' ? `${price.value}₺` : price?.value}
            {price?.unit ? ` ${price.unit}` : ''}
          </AppText>
        )}
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
