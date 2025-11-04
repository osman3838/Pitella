import { useTheme } from '@/hooks/useTheme';
import type { AppTextProps } from '@/types/index';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const AppText: React.FC<AppTextProps> = ({
  weight = 'regular',
  color,
  size = 16,
  align = 'auto',
  style,
  children,
  ...rest
}) => {
  const t = useTheme();
  const family = t.font.family[weight] ?? t.font.family.regular;
  const textColor = color ?? t.colors.text;

  return (
    <Text
      {...rest}
      style={[
        styles.base,
        {
          fontFamily: family,
          color: textColor,
          fontSize: size,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
