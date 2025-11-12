import ScanBox from '@/components/screen/Pay/ScanBox';
import ScanControls from '@/components/screen/Pay/ScanControls';
import ScanHeader from '@/components/screen/Pay/ScanHeader';
import { useQrScanner } from '@/hooks/useQrScanner';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function PayScreen() {
  const t = useTheme();
  const s = styles(t);
  const { hasPermission, state, handleScan, requestAgain } = useQrScanner();

  const showCamera = hasPermission === true && (state === 'scanning' || state === 'found');

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <ScanHeader />
        <ScanBox showCamera={showCamera} state={state} onScan={handleScan} />
        <ScanControls
          hasPermission={hasPermission}
          state={state}
          onRequestPermission={requestAgain}
        />
      </ScrollView>
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.background,
      paddingHorizontal: t.spacing.lg,
      paddingTop: t.spacing.lg,
    },
    content: {
      minHeight: '100%',
      alignItems: 'center',
      paddingBottom: 120,
    },
  });
