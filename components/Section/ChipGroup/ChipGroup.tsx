import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { SectionChip } from '@/types/ui/section';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function ChipGroup({ items }: { items: SectionChip[] }) {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.row}
    >
      {items.map(ch => {
        const active = !!ch.active;

        return (
          <Pressable key={ch.key} onPress={ch.onPress}>
            <View
              style={[
                s.chip,
                {
                  backgroundColor: active ? colors.gray : 'transparent',
                },
              ]}
            >
              {ch.icon && (
                <Icon
                  name={ch.icon as any}
                  size={14}
                  color={active ? colors.primary : colors.text}
                />
              )}

              <AppText size={12} style={{ marginLeft: ch.icon ? 6 : 0 }}>
                {ch.label}
              </AppText>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  row: { gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
