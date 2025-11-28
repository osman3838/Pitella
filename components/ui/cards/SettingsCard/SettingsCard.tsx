// components/common/cards/SettingsCard.tsx
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
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
};

export function SettingsCard({
  items,
  style,
}: SettingsCardProps) {
  const { colors } = useTheme();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <View style={[styles.card, style]}>
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
                <Icon
                  name="Quest"

                  size={13}
                  color={"#E0E0E0"}
                />
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
