import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import type { AuthLayoutProps } from '@/types';
import ScreenContainer from '../ScreenContainer';
import { BackButton } from './BackButton';

type ExtraProps = {
  edgeContent?: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export default function AuthLayout({
  title,
  subtitle,
  showBack = true,
  hero,
  children,
  footer,
  cta,
  edgeContent,
  contentContainerStyle,
}: AuthLayoutProps & ExtraProps) {
  const { colors } = useTheme();

  return (
    <ScreenContainer
      header={hero ? <View style={s.hero}>{hero}</View> : null}
      footer={footer}
      cta={cta}
      edgeContent={edgeContent}
      contentContainerStyle={[s.contentGap, contentContainerStyle]}
    >
      {showBack && <BackButton />}

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
  hero: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  contentGap: {
    paddingTop: 12,
    rowGap: 14,
  },
  title: {
    marginTop: 12,
    marginLeft: 10,
  },
  subtitle: {
    marginTop: 6,
  },
});
