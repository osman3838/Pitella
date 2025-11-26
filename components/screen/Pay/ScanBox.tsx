import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { ScanBoxProps } from '@/types/components/qrScannerTypes';
import { CameraView } from 'expo-camera';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ScanBox(props: ScanBoxProps) {
  const {
    showCamera,
    state,
    hasPermission,
    onScan,
    torchEnabled,
    onToggleTorch,
    onClose,
  } = props;

  const t = useTheme();
  const s = styles(t);

  // Camera açılmadıysa placeholder (normal layout içinde kare kutu)
  if (!showCamera) {
    return (
      <View style={s.boxPlaceholder}>
        <Icon name="Barcode" size={120} color={t.colors.text} />
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={s.boxPlaceholder}>
        <ActivityIndicator />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={s.boxPlaceholder}>
        <Text style={s.infoText}>
          Kamerayı kullanmak için ayarlardan izin vermen gerekiyor.
        </Text>
      </View>
    );
  }

  // FULLSCREEN OVERLAY
  return (
    <View style={s.fullscreen}>
      <CameraView
        facing="back"
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={state === 'scanning' ? onScan : undefined}
        enableTorch={torchEnabled ?? false}
      />

      {/* Çerçeve */}
      <View pointerEvents="none" style={s.frameOuter}>
        <View style={s.frameInner} />
      </View>

      {/* Close Button */}
      {onClose && (
        <Pressable onPress={onClose} style={s.closeBtn}>
          <Text style={s.closeText}>Kapat</Text>
        </Pressable>
      )}

      {/* Torch Button */}
      {onToggleTorch && (
        <Pressable style={s.torchButton} onPress={onToggleTorch}>
          <Text style={s.torchText}>
            {torchEnabled ? 'Feneri kapat' : 'Feneri aç'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    // EKRANI %100 KAPLAYAN OVERLAY
    fullscreen: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 999,
      elevation: 999,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Normal sayfa içindeki placeholder kutu
    boxPlaceholder: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 16,
      backgroundColor: t.colors.gray,
      alignItems: 'center',
      justifyContent: 'center',
    },

    infoText: {
      color: t.colors.text,
      textAlign: 'center',
      fontSize: 14,
      paddingHorizontal: 20,
    },

    frameOuter: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '8%',
    },

    frameInner: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 20,
      borderWidth: 3,
      borderColor: 'rgba(255,255,255,0.9)',
    },

    closeBtn: {
      position: 'absolute',
      top: 48,
      right: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 30,
      backgroundColor: 'red',
    },
    closeText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '600',
    },

    torchButton: {
      position: 'absolute',
      bottom: 50,
      alignSelf: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 999,
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    torchText: {
      color: '#fff',
      fontSize: 13,
      fontWeight: '500',
    },
  });
