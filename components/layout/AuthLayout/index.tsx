import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import type { AuthLayoutProps } from '@/types';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../ScreenContainer';
import { BackButton } from './BackButton';

export default function AuthLayout({
  title,
  subtitle,
  showBack = true,
  hero,
  children,
  footer,
  cta,
}: AuthLayoutProps) {
  const { colors } = useTheme();

  return (
    <ScreenContainer
      header={hero ? <View style={s.hero}>{hero}</View> : null}
      footer={footer}
      cta={cta}
      contentContainerStyle={s.contentGap}
    >
      

      {showBack && (
        <BackButton  />
      )}



      {!!title && (
        <AppText
          weight="bold"
          
          size={28}
          color={colors.text}
          style={s.title}
        >
          {title}
        </AppText>
      )}

      {!!subtitle && (
        <AppText
          weight="regular"
          size={14}
          color={colors.mutedText}
          align="center"
          style={s.subtitle}
        >
          {subtitle}
        </AppText>
      )}

      {children}

    </ScreenContainer>
  );
}

const s = StyleSheet.create({
  hero: { alignItems: 'center', paddingVertical: 24 },
  contentGap: { paddingTop: 12, rowGap: 14 },
  backRow: { flexDirection: 'row', alignItems: 'center' },
  backCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { marginLeft: 8 },
  avatarWrap: { alignItems: 'center' },
  title: { marginTop: 12,marginLeft:10 },
  subtitle: { marginTop: 6 },
});
