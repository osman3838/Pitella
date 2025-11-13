import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ScanHeader() {
  const t = useTheme();
  const s = styles(t);

  return (
    <View style={s.wrap}>
      <AppText size={16} weight="bold" align="center">
        Otomat üzerindeki{' '}
        <AppText size={16} weight="bold" color="primary">QR Kodu</AppText>{' '}
        kameraya gösterin.
      </AppText>
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    wrap: { marginTop: t.spacing.lg, marginBottom: t.spacing.sm },
  });
