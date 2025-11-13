import { useTheme } from '@/hooks/useTheme';
import Icon, { Barcode } from '@/icons';
import type { ScanState } from '@/types/hooks/qrScannerTypes';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  showCamera: boolean;
  state: ScanState;
  onScan: (e: { data: string }) => void;
};

export default function ScanBox({ showCamera, state, onScan }: Props) {
  const t = useTheme();
  const s = styles(t);

  return (
    <View style={s.box}>
      {showCamera ? (
        <Barcode
          onBarcodeScanned={state === 'scanning' ? onScan : undefined}
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
    box: { alignItems: 'center', marginTop: 12 },
    scanner: {
      width: 260,
      height: 260,
      borderRadius: 12,
      overflow: 'hidden',
    },
    placeholder: {
      width: 260,
      height: 260,
      borderRadius: 12,
      backgroundColor: t.colors.gray,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
