// app/(stack)/checkout.tsx
import React, { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { CodeSection, SummarySection } from '@/components/screen/Checkout';
import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setCode,
  setProduct,
} from '@/redux/slices/checkout.slice';

export default function Checkout() {
  const t = useTheme();
  const s = styles(t);

  const dispatch = useAppDispatch();
  const { code, loadingPay, loadingTopUp } = useAppSelector(
    state => state.checkout,
  );
  const product = {name:"Pizza",price:10};

  useEffect(() => {
    if (!product) {
      dispatch(
        setProduct({
          name: 'Pizza',
          price: 10,
        }),
      );
    }
  }, [product, dispatch]);

  const handleCodeChange = (value: string) => {
    dispatch(setCode(value));
  };

  const handleCodeComplete = (value: string) => {
    dispatch(setCode(value));
  };

  const handlePay = async () => {
    if (!product) {
      Alert.alert('Ürün bulunamadı', 'Lütfen önce geçerli bir kod gir.');
      return;
    }

    try {
      Alert.alert('Ödeme', 'Ödeme akışı burada implemente edilecek.');
    } finally {
    }
  };

  const handleTopUp = async () => {
    try {
      Alert.alert('Bakiye Yükleme', 'Bakiye yükleme akışı burada olacak.');
    } finally {
    }
  };

  return (
    <View style={s.container}>
      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}>
        <CodeSection
          value={code}
          onChange={handleCodeChange}
          onComplete={handleCodeComplete}
          helperText="Otomat ekranındaki 3 haneli kodu giriniz."
        />

        {product && (
          <SummarySection
            product={product}
            code={code}
            onPay={handlePay}
            loadingPay={loadingPay}
            loadingTopUp={loadingTopUp}
            onTopUp={handleTopUp}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: t.spacing.lg,
      paddingTop: t.spacing.xl,
    },
    content: {
      paddingBottom: 120,
      gap: 32,
    },
  });
