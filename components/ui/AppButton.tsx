import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { AppButtonProps, ButtonSize } from '@/types/ui/buttonTypes';
import React, { memo, useMemo } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from 'react-native';

export const AppButton = memo((props: AppButtonProps) => {
  const t = useTheme();

  const {
    title,
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    block,
    round,
    leftIcon,
    rightIcon,
    style,
    android_ripple,
    ...rest
  } = props;

  const {
    btnStyle,
    textColor,
    contentPaddingH,
    contentPaddingV,
    borderColor,
    backgroundColor,
  } = useMemo(() => {
    // sizes
    const sizes: Record<ButtonSize, { pv: number; ph: number; text: number; radius: number; gap: number; minH: number }> = {
      sm: { pv: 8,  ph: 12, text: 14, radius: t.radius,     gap: 6,  minH: 36 },
      md: { pv: 12, ph: 16, text: 16, radius: t.radius * 1.25, gap: 8,  minH: 44 },
      lg: { pv: 14, ph: 18, text: 18, radius: t.radius * 1.5,  gap: 10, minH: 52 },
    };

    const sdef = sizes[size];

    // variants
    const palette = {
      primary:  { bg: t.colors.primary,    text: '#fff',          border: t.colors.primary },
      secondary:{ bg: t.colors.secondary,  text: '#fff',          border: t.colors.secondary },
      danger:   { bg: t.colors.danger,     text: '#fff',          border: t.colors.danger },
      outline:  { bg: 'transparent',       text: t.colors.text,   border: t.colors.border },
      ghost:    { bg: 'transparent',       text: t.colors.text,   border: 'transparent' },
    } as const;

    const pal = palette[variant];

    return {
      textColor: pal.text,
      contentPaddingH: sdef.ph,
      contentPaddingV: sdef.pv,
      borderColor: pal.border,
      backgroundColor: pal.bg,
      btnStyle: {
        minHeight: sdef.minH,
        borderRadius: round ? 999 : sdef.radius,
        gap: sdef.gap,
      },
    };
  }, [variant, size, round, t]);

  const disabledOrLoading = disabled || loading;

  return (
    <Pressable
      {...rest}
      android_ripple={
        android_ripple ??
        (Platform.OS === 'android'
          ? { color: variant === 'ghost' || variant === 'outline' ? t.colors.gray : t.shadow?.heavy ?? 'rgba(0,0,0,0.12)' }
          : undefined)
      }
      disabled={disabledOrLoading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          borderColor,
          opacity: disabledOrLoading ? 0.6 : pressed ? 0.9 : 1,
          paddingHorizontal: contentPaddingH,
          paddingVertical: contentPaddingV,
        },
        block && styles.block,
        btnStyle,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
    >
      {/* left icon */}
      {leftIcon ? <View style={styles.iconWrap}>{leftIcon}</View> : null}

      {/* content */}
      <View style={styles.labelWrap}>
        {loading ? (
          <ActivityIndicator size="small" color={textColor} />
        ) : children ? (
          children
        ) : (
          <AppText
            weight="semiBold"
            size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
            color={textColor}
            align="center"
            numberOfLines={1}
          >
            {title}
          </AppText>
        )}
      </View>

      {/* right icon */}
      {rightIcon ? <View style={styles.iconWrap}>{rightIcon}</View> : null}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  block: {
    width: '100%',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
