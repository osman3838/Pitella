import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import type { HeroModel } from '@/types';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';


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

  const overlay = Math.min(Math.max(style?.overlay ?? 0, 0), 1); // 0..1


  // Metin bloğunun hizası/yerleşimi
  const contentPos = getContentStyle(variant);


  return (
    <Pressable android_ripple={{ color: '#00000014' }}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        imageStyle={{ borderRadius: radius }}
        style={[s.bg, { height, borderRadius: radius }]}
      >
        {/* Overlay (karartma) */}
        {overlay > 0 && (
          <View
            style={[
              s.overlay,
              { backgroundColor: `rgba(0,0,0,${overlay})`, borderRadius: radius },
            ]}
          />
        )}

        {/* İçerik */}
        <View style={[s.content, contentPos.wrap]}>
          {/* image-only ise metin yok */}
          {variant !== 'image-only' && (
            <View style={[s.textWrap, contentPos.textWrap]}>
              {!!title && (
                <AppText weight="bold" size={28} style={{ color: colors.gold }}>
                  {title}
                </AppText>
              )}
              {!!subtitle && (
                <AppText size={8} weight='semiBold' style={{ marginTop: 6 ,letterSpacing: 1.4}}>
                  {subtitle}
                </AppText>
              )}

              {/* Basit CTA (varsa) */}
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
          )}
        </View>
      </ImageBackground>
    </Pressable>
  );
}

/** Varyanta göre yerleşim kuralları */
function getContentStyle(
  variant: 'left-text' | 'right-text' | 'center' | 'image-only'
) {
  switch (variant) {
    case 'right-text':
      return {
        wrap: { alignItems: 'flex-end' } as const,
        textWrap: { alignItems: 'flex-end', marginRight: 18, maxWidth: '65%' } as const,
      };
    case 'center':
      return {
        wrap: { alignItems: 'center', justifyContent: 'center' } as const,
        textWrap: { alignItems: 'center', maxWidth: '80%' } as const,
      };
    case 'image-only':
      return {
        wrap: { alignItems: 'center', justifyContent: 'center' } as const,
        textWrap: { display: 'none' } as const,
      };
    case 'left-text':
    default:
      return {
        wrap: { alignItems: 'flex-start' } as const,
        textWrap: { alignItems: 'flex-start', marginLeft: 18, maxWidth: '65%' } as const,
      };
  }
}

const s = StyleSheet.create({
  bg: {
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  textWrap: {
    gap: 4,
  },
  cta: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
});
