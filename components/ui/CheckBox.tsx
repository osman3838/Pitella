import { useTheme } from '@/hooks/useTheme';
import type { CheckBoxProps } from '@/types/ui/checkboxTypes';
import { withAlpha } from '@/utils/color';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export const CheckBox = memo(function CheckBox({
  checked,
  onChange,
  disabled,
  size = 22,
  radius = 6,
  style,
  testID,
}: CheckBoxProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      testID={testID}
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      style={({ pressed }) => [
        s.box,
        {
          width: size,
          height: size,
          borderRadius: radius,
          borderColor: checked ? withAlpha(colors.yellow, 0.0) : colors.yellow,
          backgroundColor: withAlpha(colors.yellow, checked ? 0.15 : 0.08),
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {checked ? (
        <View
          style={{
            width: size * 0.55,
            height: size * 0.55,
            borderRadius: radius * 0.6,
            backgroundColor: colors.yellow,
          }}
        />
      ) : null}
    </Pressable>
  );
});

const s = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
