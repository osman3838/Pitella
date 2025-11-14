// components/screen/Pay/ScanBox.tsx
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { ScanBoxProps } from '@/types/components/qrScannerTypes';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function ScanBox({ showCamera, state, onScan }: ScanBoxProps) {
  const t = useTheme();
  const s = styles(t);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    if (!showCamera) return;

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [showCamera]);

  // İzin durumu yüklenirken
  if (showCamera && hasPermission === null) {
    return (
      <View style={s.box}>
        <View style={s.placeholder}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  // İzin reddedildiyse
  if (showCamera && hasPermission === false) {
    return (
      <View style={s.box}>
        <View style={s.placeholder}>
          <Text style={{ color: t.colors.text, textAlign: 'center' }}>
            Kamerayı kullanmak için ayarlardan izin vermen gerekiyor.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={s.box}>
      {showCamera && hasPermission ? (
        <Camera
          onBarCodeScanned={state === 'scanning' ? onScan : undefined}
          style={s.scanner}
        />
      ) : (
        <View style={s.placeholder}>
          <Icon name="Barcode" size={120} color={t.colors.text} />
        </View>
      )}
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    box: {
      flex: 1,
      zIndex: 1,
      position: '',
      alignSelf: 'stretch',
    },
    scanner: {
      flex: 1, // tam ekran doldur
    },
    placeholder: {
      flex: 1,
      borderRadius: 12,
      backgroundColor: t.colors.gray,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
