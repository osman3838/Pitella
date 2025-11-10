
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SectionHeaderProps } from '@/types';



export default function SectionHeader({
  title,
  subtitle,
  chips = [],
  rightExtra,
  sticky,
  style,
  renderChips,
}: SectionHeaderProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        s.wrap,
        sticky && s.sticky,
        style,
      ]}
    >
      <View style={s.row}>
        <View style={s.left}>
          <AppText size={20} weight="semiBold" numberOfLines={1}>{title}</AppText>
          {!!subtitle && <AppText size={12} color="muted">{subtitle}</AppText>}
        </View>

        <View style={s.center}>
          {renderChips ? renderChips(chips) : null}
        </View>
        <View style={s.right}>
          {rightExtra ?? null}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingHorizontal: 12, paddingTop: 6, paddingBottom: 10, borderBottomWidth: 0 },
  sticky: { position: 'relative' as any, zIndex: 5 }, 
  row: { flexDirection: 'row', alignItems: 'center' },

  left:  { flex: 1, minWidth: 0, paddingRight: 8 },
  center:{ flexShrink: 1, alignItems: 'center', justifyContent: 'center' },
  right: { flex: 1, minWidth: 0, alignItems: 'flex-end', paddingLeft: 8 },
});
