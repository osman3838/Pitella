import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  onPress?: () => void;
  size?: number;
  hitSlop?: { top: number; right: number; bottom: number; left: number };
};

export default function SearchButton({ onPress, size = 24, hitSlop }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Arama aç"
      hitSlop={hitSlop ?? { top: 8, right: 8, bottom: 8, left: 8 }}
      style={[
        styles.button,
        {
          borderColor: colors.secondary,
        },
      ]}
      activeOpacity={0.7}
    >
      <Icon name="Search" size={size} color={colors.secondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 3,
    borderRadius: 52,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
