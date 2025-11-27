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
  const { colors } = useTheme(); // şimdilik sadece theme için, istersen renk bağlayabilirsin

  return (
    <View
      style={[
        s.wrap,
        sticky && s.sticky,
        style,
      ]}
    >
      <View style={s.row}>
        {/* SOL: Title + subtitle */}
        <View style={s.left}>
          <AppText
            size={17}
            style={{ marginLeft: 9 }}
            weight="semiBold"
            numberOfLines={1}
          >
            {title}
          </AppText>

          {!!subtitle && (
            <AppText size={12} color="muted" numberOfLines={1}>
              {subtitle}
            </AppText>
          )}
        </View>

        {/* ORTA: Chips alanı (ChipGroup vs başka şey) */}
        {renderChips && (
          <View style={s.center}>
            {renderChips(chips)}
          </View>
        )}

        {/* SAĞ: opsiyonel extra */}
        {rightExtra && (
          <View style={s.right}>
            {rightExtra}
          </View>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 10,
    borderBottomWidth: 0,
  },

  sticky: {
    position: 'relative' as any,
    zIndex: 5,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Sol taraf: esner, ama minWidth: 0 ki flex shrink çalışabilsin
  left: {
    flex: 1,
    minWidth: 100,
    paddingRight: 8,
  },

  // Orta: kendi genişliğince, sıkışmasın
  center: {
    flexGrow: 1,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },

  // Sağ: içerik kadar, esnemesin; varsa görünsün, yoksa hiç render olmuyor
  right: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 600,
    alignItems: 'flex-end',
    paddingLeft: 8,
  },
});
