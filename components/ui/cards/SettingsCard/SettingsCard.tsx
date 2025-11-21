// components/common/cards/SettingsCard.tsx
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

export type SettingsItem = {
  id: string;
  label: string;
  onPress?: () => void;
};

type SettingsCardProps = {
  items: SettingsItem[];
  style?: ViewStyle;
  /**
   * Sağ tarafa ikon / indicator / ok vs. koymak için opsiyonel render fonksiyonu
   */
  renderRightAccessory?: (item: SettingsItem) => React.ReactNode;
};

export function SettingsCard({
  items,
  style,
  renderRightAccessory,
}: SettingsCardProps) {
  const { colors } = useTheme();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.card,
        { backgroundColor:  '#FFFFFF' },
        style,
      ]}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={item.id}>
            <Pressable
              style={styles.row}
              onPress={item.onPress}
              android_ripple={{ borderless: false }}
            >
              <AppText size={13}>{item.label}</AppText>

              <View style={styles.right}>
                {renderRightAccessory?.(item)}
              </View>
            </Pressable>

            {!isLast && <View style={styles.divider} />}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  right: {
    marginLeft: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
  },
});
