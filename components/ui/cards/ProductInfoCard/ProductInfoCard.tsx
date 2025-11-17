// components/ui/cards/ProductInfoCard/ProductInfoCard.tsx
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import type { ProductType } from '@/types/features/checkout';

import { Header } from './parts/Header';
import { CodeLine } from './parts/CodeLine';
import { Price } from './parts/Price';
import { Actions } from './parts/Actions';

type Props = {
  product: ProductType;
  style?: StyleProp<ViewStyle>;
  showRating?: boolean;
  showCode?: boolean;
  showPrice?: boolean;
  onPay?: () => void;
  onTopUp?: () => void;
  loadingPay?: boolean;
  loadingTopUp?: boolean;
};

export const ProductInfoCard: React.FC<Props> = ({
  product,
  style,
  showRating = true,
  showCode = true,
  showPrice = true,
  onPay,
  onTopUp,
  loadingPay,
  loadingTopUp,
}) => {
  const hasActions = !!(onPay && onTopUp);

  return (
    <View style={[styles.card, style]}>
      <Header
        name={product.name}
        rating={showRating ? product.rating : undefined}
        ratingCount={product.ratingCount}
      />

      {showCode && <CodeLine code={product.code} />}

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        {showPrice && <Price price={product.price} />}

        {hasActions && (
          <View style={styles.rightSlot}>
            <Actions
              onPay={onPay!}
              onTopUp={onTopUp!}
              loadingPay={loadingPay}
              loadingTopUp={loadingTopUp}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#00000022',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rightSlot: {
    marginLeft: 12,
  },
});
