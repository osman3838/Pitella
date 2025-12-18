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

  const {
    hasPermission,
    state,
    showCamera,
    handleScan,
    requestAgain,
    torchEnabled,
    toggleTorch,
    openScanner,
    closeScanner,
  } = useQrScanner();

  return (
    <View style={s.container}>
      <View style={s.content}>
        <ScanHeader />

        {/* Ortada daha kompakt kare kutu */}
        <View style={s.scannerWrapper}>
          <ScanBox
            showCamera={false}
            state={state}
            hasPermission={hasPermission}
            onScan={handleScan}
            torchEnabled={torchEnabled}
            onToggleTorch={toggleTorch}
            onClose={closeScanner}
          />
        </View>

        {/* Alt kısım scroll edilebilir kontroller */}
 
      </View>

      {/* QR AÇIKKEN: EKRANI %100 KAPLAYAN OVERLAY */}
      {showCamera && (
        <View style={s.cameraOverlay}>
          <ScanBox
            showCamera={true}
            state={state}
            hasPermission={hasPermission}
            onScan={handleScan}
            torchEnabled={torchEnabled}
            onToggleTorch={toggleTorch}
            onClose={closeScanner}
          />
        </View>
      )}
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: t.spacing.lg,
      paddingTop: t.spacing.lg,
    },
    scannerWrapper: {
      marginTop: t.spacing.lg,
      marginBottom: t.spacing.lg,
      alignSelf: 'center',
      width: '100%',
      maxWidth: 320,
      aspectRatio: 1, // kare kutu, ekranı saçma uzatmıyor
    },
    controlsScroll: {
      flex: 1,
    },
    controlsContent: {
      paddingBottom: 32,
    },
    cameraOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: t.colors.background,
    },
  });
