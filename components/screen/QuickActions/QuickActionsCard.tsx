import { AppText } from '@/components/ui/AppText';
import type { QuickActionsCardProps } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ListRow from './ListRow';


export default function QuickActionsCard({ card }: QuickActionsCardProps) {
  const { colors } = useTheme();

  return (
    <View style={[s.card, { backgroundColor: "white" }]}>
      {/* Başlık */}
      {!!card.title && (
        <AppText size={14} weight="bold" style={s.title}>
          {card.title}
        </AppText>
      )}

      {/* Satırlar */}
      {card.rows.map((row, index) => (
        <View key={row.key}>
          <ListRow
            label={row.label}
            icon={row.icon}
            color={row.color}
            onPress={row.onPress}
          />
          {index < card.rows.length - 1 && (
            <View style={[s.divider, { backgroundColor: colors.border ?? '#E5E5E5' }]} />
          )}
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 230,
    alignSelf: 'flex-end',
  },
  title: {
    marginBottom: 8,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    opacity: 0.85,
  },
});
