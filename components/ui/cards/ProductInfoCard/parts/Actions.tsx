// components/ui/cards/ProductInfoCard/parts/Actions.tsx
import { AppText } from '@/components/ui/AppText';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
  onPay: () => void;
  onTopUp: () => void;
  loadingPay?: boolean;
  loadingTopUp?: boolean;
};

export const Actions: React.FC<Props> = ({
  onPay,
  onTopUp,
  loadingPay = false,
  loadingTopUp = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.payButton]}
        onPress={onPay}
        disabled={loadingPay}
        activeOpacity={0.8}
      >
        {loadingPay ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <AppText weight="semibold" size={13} color="#fff">
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
          <AppText weight="semibold" size={13} color="#fff">
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
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
  },
  payButton: {
    backgroundColor: '#33D57A', // yeşil
  },
  topUpButton: {
    backgroundColor: '#FFB43A', // turuncu
  },
});
