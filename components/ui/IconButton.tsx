import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View
} from 'react-native';

import { IconButtonProps } from '@/types';

export const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  disabled = false,
  loading = false,
  size = 56,
  radius = 14,
  backgroundColor = '#fff',
  style,
  children,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        s.button,
        {
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor,
          opacity: disabled ? 0.6 : 1,
          transform: pressed ? [{ scale: 0.96 }] : [],
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <View style={s.center}>{children}</View>
      )}
    </Pressable>
  );
};

const s = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
