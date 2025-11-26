import { useTheme } from '@/hooks/useTheme';
import type { AppButtonProps, ButtonSize, ButtonVariant } from '@/types/ui/buttonTypes';
import React, { memo, useMemo } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from 'react-native';

type Props = AppButtonProps & {
  bgColor?: string;        // ✅ arka plan override
  borderColor?: string;    // ✅ border override
  labelColor?: string;     // ✅ metin/ikon rengi override (çocuk Text değilse etkisi sınırlı)
  spinnerColor?: string;   // ✅ loader rengi
  dimOnPress?: boolean;    // ✅ basınca opaklık efekti kapatma/açma
};

export const AppButton = memo((props: Props) => {
  const t = useTheme();

  const {
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    block = false,
    round,
    leftIcon,
    rightIcon,
    style,
    android_ripple,
    disabled: disabledProp,
    align = 'center',
    bgColor,              // ✅
    borderColor: borderOverride, // ✅
    labelColor,           // ✅
    spinnerColor,         // ✅
    dimOnPress = true,    // ✅
    ...rest
  } = props;

  const {
    btnStyle,
    contentPaddingH,
    contentPaddingV,
    borderColor,
    backgroundColor,
  } = useMemo(() => {
    const sizes: Record<ButtonSize, { pv: number; ph: number; radius: number; gap: number; minH: number }> = {
      sm: { pv: 8,  ph: 12, radius: t.radius,        gap: 6,  minH: 36 },
      md: { pv: 12, ph: 16, radius: t.radius * 1.25, gap: 8,  minH: 44 },
      lg: { pv: 14, ph: 18, radius: t.radius * 1.5,  gap: 10, minH: 52 },
    };
    const sdef = sizes[size];

    const palette: Record<ButtonVariant, { bg: string; border: string; defaultLabel: string }> = {
      primary:   { bg: t.colors.primary,   border: t.colors.primary,   defaultLabel: t.colors.onPrimary ?? '#fff' },
      secondary: { bg: t.colors.secondary, border: t.colors.secondary, defaultLabel: t.colors.onSecondary ?? '#fff' },
      danger:    { bg: t.colors.danger,    border: t.colors.danger,    defaultLabel: '#fff' },
      outline:   { bg: 'transparent',      border: t.colors.border,    defaultLabel: t.colors.text },
      ghost:     { bg: 'transparent',      border: 'transparent',      defaultLabel: t.colors.text },
    };
    const pal = palette[variant];

    return {
      contentPaddingH: 7,
      contentPaddingV: 7,
      borderColor: borderOverride ?? pal.border,
      backgroundColor: bgColor ?? pal.bg,
      btnStyle: {
        minHeight: sdef.minH,
        // round true ise kapsül; değilse block ise otomatik kapsül; aksi halde standart radius
        borderRadius: round ? 999 : block ? sdef.minH / 2 : sdef.radius,
        gap: sdef.gap,
      },
      // not: label rengi children içindeki AppText tarafından daha iyi kontrol edilir
    };
  }, [variant, size, round, block, bgColor, borderOverride, t]);

  const disabled = disabledProp || loading;

  return (
    <Pressable
      {...rest}
      android_ripple={
        android_ripple ??
        (Platform.OS === 'android'
          ? {
              color:
                variant === 'ghost' || variant === 'outline'
                  ? t.colors.gray
                  : t.shadow?.heavy ?? 'rgba(0,0,0,0.12)',
            }
          : undefined)
      }
      disabled={!!disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          borderColor,
          paddingHorizontal: contentPaddingH,
          paddingVertical: contentPaddingV,
          justifyContent:
            align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
        },
        block && styles.block,
        btnStyle,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
    >
      {leftIcon ? <View style={styles.iconWrap}>{leftIcon}</View> : null}

      <View style={styles.labelWrap}>
        {loading ? (
          <ActivityIndicator size="small" color={spinnerColor ?? (labelColor ?? '#fff')} />
        ) : (
          // Çocuk Text değilse renge karışma; AppText kullanıyorsan labelColor’ı orada geçir
          children
        )}
      </View>

      {rightIcon ? <View style={styles.iconWrap}>{rightIcon}</View> : null}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  block: { width: '100%' },
  iconWrap: { alignItems: 'center', justifyContent: 'center' },
  labelWrap: { flexShrink: 1, alignItems: 'center', justifyContent: 'center' },
});
