import type { AvatarProps } from '@/types'; // root index'inden geliyor (./ui/avatarTypes re-export)
import { Image } from 'expo-image';
import React, { forwardRef, memo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

const Avatar = memo(
  forwardRef<View, AvatarProps>(function Avatar(
    {
      source,
      size = 44,
      rounded,
      fallbackColor = '#E5E5E5',
      borderColor,
      borderWidth = 0,
      style,
      children,
    },
    ref
  ) {
    const radius = rounded ?? size / 2;

    const baseStyle: ViewStyle = {
      width: size,
      height: size,
      borderRadius: radius,
      overflow: 'hidden',
      borderColor,
      borderWidth,
    };

    if (!source) {
      return (
        <View ref={ref} style={[baseStyle, styles.center, { backgroundColor: fallbackColor }, style]}>
          {children}
        </View>
      );
    }

    return (
      <View ref={ref} style={[baseStyle, style]}>
        <Image
          source={source}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={120}
        />
        {children ? <View pointerEvents="box-none" style={styles.overlay}>{children}</View> : null}
      </View>
    );
  })
);

export default Avatar;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
