// app/(stack)/checkout.tsx veya Checkout ekran dosyan
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { CodeSection, SummarySection } from '@/components/screen/Checkout';
import { useTheme } from '@/hooks/useTheme';
import { mocks } from '@/mocks';
import type { ProductType } from '@/types/features/checkout';

export default function Checkout() {
  const t = useTheme();
  const s = styles(t);

  const [soupCode, setSoupCode] = useState('');
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingTopUp, setLoadingTopUp] = useState(false);

  const product = {name:"Çorba",price:10}   ;

  const handleCodeComplete = (code: string) => {
    console.log('Kod tamamlandı:', code);
  };

  const handlePay = async () => {
    if (!product) {
      Alert.alert('Ürün bulunamadı', 'Lütfen önce geçerli bir kod gir.');
      return;
    }

    try {
      setLoadingPay(true);
      // Burada ödeme isteğini atarsın
      // await api.checkout.pay({ code: soupCode, productId: product.id });
      Alert.alert('Ödeme', 'Ödeme akışı burada implemente edilecek.');
    } catch (e) {
      Alert.alert('Hata', 'Ödeme sırasında bir hata oluştu.');
    } finally {
      setLoadingPay(false);
    }
  };

  const handleTopUp = async () => {
    try {
      setLoadingTopUp(true);
      // Burada bakiye yükleme ekranına yönlendirme / akış
      // router.push('/wallet/topup') gibi
      Alert.alert('Bakiye Yükleme', 'Bakiye yükleme akışı burada olacak.');
    } catch (e) {
      Alert.alert('Hata', 'Bakiye yükleme sırasında bir hata oluştu.');
    } finally {
      setLoadingTopUp(false);
    }
  };

  return (
    <View style={s.container}>
      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        <CodeSection
          value={soupCode}
          onChange={setSoupCode}

          onComplete={handleCodeComplete}
          helperText="Otomat ekranındaki 3 haneli kodu giriniz."
        />

        {product && (
          <SummarySection
            product={product}
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
