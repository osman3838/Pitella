// components/ui/cards/ProductInfoCard/parts/Actions.tsx
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
type Props = {
  onPay: () => void;
  code?: string;
  onTopUp: () => void;
  loadingPay?: boolean;
  loadingTopUp?: boolean;
};

export const Actions: React.FC<Props> = ({
  onPay,
  onTopUp,
  loadingPay = false,
  code,
  loadingTopUp = false,
}) => {
  const t = useTheme();
  
  const isCodeEmpty = !code || code.trim().length !== 3;

  return (
    <View style={styles.container}>
   <TouchableOpacity
  style={[
    styles.button,
    styles.payButton,
    isCodeEmpty && styles.disabledButton,
  ]}
  onPress={onPay}
  disabled={loadingPay || isCodeEmpty || !code}
  activeOpacity={0.8}
>
        {loadingPay ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <AppText weight="bold" size={13} color="#fff">

            Ödeme Yap
          </AppText>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.topUpButton]}
        onPress={onTopUp}
        disabled={loadingTopUp}
        activeOpacity={0.8}
      >
        {loadingTopUp ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <AppText weight="bold" size={13} color="#fff">
            Bakiye Yükle
          </AppText>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    rowGap: 8,
  },
  button: {
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 999,
    minWidth: 120,
  },
  disabledButton: {
    backgroundColor:"#ddd",
    color:"white",
  },
  payButton: {
    backgroundColor: '#33D57A',
  },
  topUpButton: {
    backgroundColor: '#FFB43A',
  },
});
