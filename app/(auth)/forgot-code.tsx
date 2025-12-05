// app/(auth)/forgot-code.tsx
// Sadece görüntü/UX. Doğrulama yok. OTPInput bileşenini kullanır.

import { Link } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import AuthLayout from '@/components/layout/AuthLayout';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import OTPInput from '@/components/ui/OTPInput';
import { OTPInputRef } from '@/types';
import { Image } from 'expo-image';
import { Images } from '@/assets';

const CODE_LEN = 6;

export default function ForgotCode() {
  const { colors, spacing } = useTheme();

  const [code, setCode] = useState('');
  const otpRef = useRef<OTPInputRef>(null);

  const filled = useMemo(() => code.length === CODE_LEN, [code]);

  return (
    <AuthLayout
      title=""
      cta={null}
      footer={
        <AppText align="center" color={colors.mutedText}>
          Şifreyi hatırladın mı?{' '}
          <Link href="/(auth)/login" style={{ color: colors.mutedText }}>
            Giriş Yap
          </Link>
        </AppText>
      }
    >
      {/* Dekor görsel */}


      <View style={styles.wrapper}>
    <View style={{position:"absolute",top:"100%",left:-90,height:100,width:100}}>
        <Image
          source={Images.SendCode.Background02}
          style={{ width: '100%', height: '100%',zIndex:1200 }}
          contentFit="contain"
        />
      </View>          
        {/* Başlık */}
        <View style={styles.header}>
          <AppText
            size={28}
            weight="bold"
            align="center"
            style={{ color: colors.text }}
          >
            Şifremi Unuttum
          </AppText>
          <AppText
            align="center"
            color={colors.mutedText}
            style={{ marginTop: 6 }}
          >
            efilay23e@gmail.com adresine gönderilen kodu giriniz.
          </AppText>
        </View>

        {/* OTPInput kutuları */}
        <View style={{ marginTop: spacing.xl, width: '100%' }}>
          <OTPInput
            ref={otpRef}
            length={CODE_LEN}
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            gap={12}
            containerStyle={styles.otpRow}
          />
        </View>

        {/* Butonlar */}
        <View style={styles.actions}>
          <AppButton
            block
            round
            variant="secondary"
            style={{ width: '60%', borderRadius: 30 }}
            onPress={() => {}}
            disabled={!filled}
          >
            <AppText size={20} weight="bold" color="#fff">
              Giriş
            </AppText>
          </AppButton>

          <AppButton
            block
            round
            variant="ghost"
            style={{ width: '60%', borderRadius: 30 }}
            onPress={() => {
              setCode('');
              otpRef.current?.focus(0);
            }}
          >
            <AppText size={14} weight="regular" color={colors.mutedText}>
              Kodu Tekrar Gir
            </AppText>
          </AppButton>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // dikeyde ortaya al
    position: 'relative',
    gap: 32,
  },
  // 🔹 Dekor: üstte kalsın, padding altında kaybolmasın
  decoration: {
    position: 'absolute',
    top: -120,       // hafif yukarı taşı
    right: 0,       // sağ kenara yapıştır
    width: 100,
    height: 100,
  },
  header: {
    alignItems: 'center',
    gap: 4,
  },
  otpRow: {
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  actions: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
});
