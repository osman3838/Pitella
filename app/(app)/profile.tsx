// app/(tabs)/profile.tsx
import QuickActionsCard from '@/components/screen/QuickActions/QuickActionsCard';
import { useTheme } from '@/hooks/useTheme';
import type { QuickActionsModel } from '@/types';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function ProfileScreen() {
  const t = useTheme();
  const s = styles(t);

  const quickActions: QuickActionsModel = {
    title: 'Hızlı İşlemler',
    rows: [
      { key: 'profile', label: 'Profilimi Görüntüle', icon: 'Person', onPress: () => {} },
      { key: 'balance', label: 'Bakiyem', icon: 'Balance', onPress: () => {} },
      { key: 'points', label: 'Puanlar', icon: 'Review', onPress: () => {} },
      { key: 'help', label: 'Yardım', icon: 'Info', onPress: () => {} },
      { key: 'faq', label: 'S.S.S.', icon: 'Question', onPress: () => {} },
    ],
  };

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }} />

        <QuickActionsCard card={quickActions} />
      </ScrollView>
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: t.spacing.lg,
      paddingTop: t.spacing.lg,
    },
    content: {
      minHeight: '100%',
      paddingBottom: 120, // BottomBar’a çakışmasın
      gap: 12,
    },
  });
