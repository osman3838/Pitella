import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import type { HeroModel } from '@/types';
import React from 'react';
import {
  Image,
  ImageBackground,
  ImageStyle,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

export default function Hero({
  title,
  subtitle,
  image,
  variant = 'left-text',
  style,
  cta,
}: HeroModel) {
  const { colors } = useTheme();

  const height = style?.height ?? 200;
  const radius = style?.radius ?? 40;
  const overlay = Math.min(Math.max(style?.overlay ?? 0, 0), 1);

  const foreground = (style as any)?.foreground as
    | Array<{ src: any; style?: ImageStyle }>
    | undefined;

  return (
    <Pressable android_ripple={{ color: '#00000014' }}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        imageStyle={{ borderRadius: radius }}
        style={[s.bg, { height, borderRadius: radius }]}
      >
        <View style={s.row}>
          <View style={s.left}>
            {!!title && (
              <AppText weight="bold" size={28} style={{ color: colors.gold,lineHeight:34}}>
                {title}
              </AppText>
            )}

            {!!subtitle && (
              <AppText
                size={10}
                weight="semiBold"
                style={{ marginTop: 6, letterSpacing: 1.4 }}
              >
                {subtitle}
              </AppText>
            )}

            {cta?.label && cta?.onPress && (
              <Pressable
                onPress={cta.onPress}
                style={s.cta}
                android_ripple={{ color: '#0000001a', borderless: false }}
              >
                <AppText weight="medium" size={14}>
                  {cta.label}
                </AppText>
              </Pressable>
            )}
          </View>

          <View style={s.right}>
            {!!foreground?.length &&
              foreground.map((f, i) => (
                <Image
                  key={i}
                  source={f.src}
                  resizeMode="contain"
                  style={[s.fg, f.style]}
                />
              ))}
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const s = StyleSheet.create({
  bg: {
    width: '100%',
    justifyContent: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  left: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },

  right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  fg: {
    width: 120,
    height: 120,
    position: 'absolute',
    bottom: -5,
    right: 0,
  },

  cta: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
});
