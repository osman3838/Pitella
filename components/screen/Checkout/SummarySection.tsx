import { ProductInfoCard } from '@/components/ui/cards/ProductInfoCard';
import type { ProductType } from '@/types/features/checkout';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  product: ProductType;
  onPay: () => void;
  onTopUp: () => void;
  loadingPay?: boolean;
  loadingTopUp?: boolean;
  code?: string;
};

export const SummarySection: React.FC<Props> = ({
  product,
  onPay,
  onTopUp,
  loadingPay,
  loadingTopUp,
  code,
}) => {
  return (
    <View style={styles.container}>
      <ProductInfoCard
        product={product}
        onPay={onPay}
        onTopUp={onTopUp}
        loadingPay={loadingPay}
        loadingTopUp={loadingTopUp}
        code={code}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
