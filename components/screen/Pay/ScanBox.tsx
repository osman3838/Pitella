// src/components/screen/Pay/ScanBox.tsx
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
  const { showCamera, state, hasPermission, onScan, torchEnabled, onToggleTorch } =
    props;

  const t = useTheme();
  const s = styles(t);

  if (!showCamera) {
    return (
      <View style={s.box}>
        <View style={s.placeholder}>
          <Icon name="Barcode" size={120} color={t.colors.text} />
        </View>
      </View>
    );
  }

  if (hasPermission === null) {
    return (
      <View style={s.box}>
        <View style={s.placeholder}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={s.box}>
        <View style={s.placeholder}>
          <Text style={s.infoText}>
            Kamerayı kullanmak için ayarlardan izin vermen gerekiyor.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={s.box}>
      <CameraView
        facing="back"
        style={s.camera}
        onBarcodeScanned={state === 'scanning' ? onScan : undefined}
        enableTorch={torchEnabled ?? false}
      />

      <View pointerEvents="box-none" style={s.overlay}>
        <View style={s.frameOuter}>
          <View style={s.frameInner} />
        </View>

        {onToggleTorch && (
          <Pressable style={s.torchButton} onPress={onToggleTorch}>
            <Text style={s.torchText}>
              {torchEnabled ? 'Feneri kapat' : 'Feneri aç'}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    box: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: t.colors.gray,
    },
    camera: {
      flex: 1,
    },
    placeholder: {
      flex: 1,
      borderRadius: 16,
      backgroundColor: t.colors.gray,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    infoText: {
      color: t.colors.text,
      textAlign: 'center',
      fontSize: 14,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    frameOuter: {
      width: '70%',
      aspectRatio: 1,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.35)',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    frameInner: {
      width: '80%',
      height: '80%',
      borderRadius: 16,
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.85)',
    },
    torchButton: {
      position: 'absolute',
      bottom: 18,
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
