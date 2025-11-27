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
      style={s.container}              // 👈 genişliği burada kısıtlıyoruz
      contentContainerStyle={s.row}    // 👈 sadece layout & gap
    >
      {items.map(ch => {
        const active = !!ch.active;

        return (
          <Pressable key={ch.key} onPress={ch.onPress}>
            <View
              style={[
                s.chipBase,
                active ? s.chipActive : s.chipInactive,
              ]}
            >
              <View
                style={[
                  s.iconWrapper,
                  active ? s.iconWrapperActive : s.iconWrapperInactive,
                ]}
              >
                {ch.icon && (
                  <Icon
                    name={ch.icon as any}
                    size={18}
                    color={active ? colors.primary : colors.danger}
                  />
                )}
              </View>

              <AppText
                size={9}
                weight="semiBold"
                style={[
                  s.label,
                  active ? s.labelActive : s.labelInactive,
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
    // ScrollView’in kendisi → alanı daraltıyoruz
    container: {
      width: '65%',
      alignSelf: 'flex-end', // gerekiyorsa
    },

    // İçerik → sadece satır düzeni
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 6,
      paddingRight: 12,
      paddingLeft: 2,
    },

    chipBase: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 999,
      paddingVertical: 4,
      paddingHorizontal: 4,
      alignSelf: 'flex-start',
      minHeight: 32,
      overflow: 'hidden',
    },

    chipActive: {
      backgroundColor: '#EDEDED',
    },

    chipInactive: {
      backgroundColor: 'transparent',
    },

    iconWrapper: {
      width: 30,
      height: 30,
      borderRadius: 23,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 3,
      overflow: 'hidden',
    },

    iconWrapperActive: {
      backgroundColor: 'white',
    },

    iconWrapperInactive: {
      backgroundColor: 'white',
    },

    label: {
      maxWidth: 54,
      lineHeight: 11,
      flexShrink: 1,
    },

    labelActive: {
      color: colors.text,
    },

    labelInactive: {
      color: colors.danger,
    },
  });
