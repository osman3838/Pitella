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
      {/* Normal sayfa içeriği */}
      <View style={s.content}>
        <ScanHeader />

        {/* QR kapalıyken placeholder kutu */}
        {!showCamera && (
          <View style={s.scannerArea}>
            <ScanBox
              showCamera={false}
              state={state}
              hasPermission={hasPermission}
              onScan={handleScan}
              torchEnabled={torchEnabled}
              onToggleTorch={toggleTorch}
            />
          </View>
        )}

        <ScrollView
          style={s.controlsScroll}
          contentContainerStyle={s.controlsContent}
          showsVerticalScrollIndicator={false}
        >
          <ScanControls
            state={state}
            onRequestPermissionAgain={requestAgain}
            onOpenScanner={openScanner}
          />
        </ScrollView>
      </View>

      {/* QR AÇIKKEN: EKRANI %100 KAPLAYAN OVERLAY */}
      {showCamera && (
        <ScanBox
          showCamera={true}
          state={state}
          hasPermission={hasPermission}
          onScan={handleScan}
          torchEnabled={torchEnabled}
          onToggleTorch={toggleTorch}
          onClose={closeScanner}
        />
      )}
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.background,
      // DİKKAT: BURADA PADDING YOK
    },
    content: {
      flex: 1,
      paddingHorizontal: t.spacing.lg,
      paddingTop: t.spacing.lg,
    },
    scannerArea: {
      width: '100%',
      aspectRatio: 1,
      marginTop: t.spacing.lg,
      marginBottom: t.spacing.lg,
    },
    controlsScroll: {
      flex: 1,
    },
    controlsContent: {
      paddingBottom: 120,
    },
  });
