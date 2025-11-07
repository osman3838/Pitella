import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { useAppSelector } from '@/redux/hooks';
import { Link } from 'expo-router';

import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Home() {
  const t = useTheme();
  const s = styles(t);

  const user = useAppSelector((state) => state.session.user);

  return (
    <View style={s.container}>
      <AppText weight="bold" size={28} color={t.colors.text}>
        Hoş geldin {user?.name || 'misafir'}
      </AppText>

      <AppText
        size={14}
        color={t.colors.mutedText}
        style={{ marginTop: 6, marginBottom: 20 }}
      >
        Bugün senin için neler hazırladık?
      </AppText>

      {/* Örnek buton */}
      <Link href="/(app)/details/42" asChild>
        <AppButton block round>
          <AppText color="#fff" weight="bold" size={16}>Detay Sayfası</AppText>
        </AppButton>
      </Link>

      <View style={{ height: 14 }} />

      <Link href="/(app)/settings" asChild>
        <AppButton block round variant="secondary">
          <AppText color="#fff" weight="bold" size={16}>Ayarlar</AppText>
        </AppButton>
      </Link>
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: t.spacing.lg,
      paddingTop: t.spacing.xl,
    },
  });
