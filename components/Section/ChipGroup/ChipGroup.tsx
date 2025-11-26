import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { SectionChip } from '@/types/ui/section';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function ChipGroup({ items }: { items: SectionChip[] }) {
  const { colors } = useTheme();
  const s = styles(colors);

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
                active ? s.chipActive : s.chipInactive,
              ]}
            >
              {ch.icon && (
                <View style={[s.iconWrapper, active ? s.iconWrapperActive : s.iconWrapperInactive]}>
                  <Icon
                    name={ch.icon as any}
                    size={20}
                    color={active ? colors.primary : colors.text}
                  />
                </View>
              )}

              <AppText
                size={12}
                weight='semiBold'

                style={[
                  s.label,
                  ch.icon ? s.labelWithIcon : null,
                ]}
                numberOfLines={2}
              >
                {ch.label}
              </AppText>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = (colors: any) =>
  StyleSheet.create({
    row: {
      gap: 8,
      paddingHorizontal: 12,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 24,
      paddingHorizontal: 10,
      width:"75%",
      paddingVertical: 8,
    },
    chipActive: {
      backgroundColor: colors.gray, // aktif olanda arka plan dolu
      
    },
    chipInactive: {
      backgroundColor: 'transparent',
    },
    iconWrapper: {
      width: 28,
      height: 28,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 6,
    },
    iconWrapperActive: {
      backgroundColor: 'white', // aktif olanda ikon beyaz yuvarlak içinde
    },
    iconWrapperInactive: {
      backgroundColor: 'transparent',
    },
    label: {
      maxWidth: 90,
      fontWeight: '600',
      lineHeight:11
    },
    labelWithIcon: {
      // ikon varsa zaten marginRight iconWrapper’dan geliyor
    },
  });
