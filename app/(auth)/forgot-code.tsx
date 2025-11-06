// app/(auth)/forgot-code.tsx
// Sadece görüntü/UX. Doğrulama yok. OTPInput bileşenini kullanır.

import { Link } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View
} from 'react-native';

import AuthLayout from '@/components/layout/AuthLayout';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';

// OTP bileşeni ve tipleri
import OTPInput from '@/components/ui/OTPInput';
import { OTPInputRef } from '@/types';

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
          <Link href="/(auth)/forgot-code" style={{ color: colors.mutedText }}>
            Giriş Yap
          </Link>
        </AppText>
      }
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignItems: 'center', paddingHorizontal: spacing.lg }}>
            {/* Başlık */}
            <AppText
              size={28}
              weight="bold"
              align="center"
              style={{ marginTop: 14, color: colors.text }}
            >
              Şifremi Unuttum
            </AppText>
            <AppText align="center" color={colors.mutedText} style={{ marginTop: 6 }}>
              efilay23e@gmail.com adresine gönderilen kodu giriniz.
            </AppText>

            {/* OTPInput kutuları */}
            <View style={{ marginTop: spacing.xl }}>
              <OTPInput
                ref={otpRef}
                length={CODE_LEN}
                value={code}
                onChangeText={setCode}
                // onComplete={(full) => { /* istersen burada butonsuz submit */ }}
                keyboardType="number-pad"
                containerStyle={{ flexDirection: 'row', justifyContent: 'center', columnGap: 12 }}
                boxStyle={[
                  { borderColor: 'rgba(0,0,0,0.08)', backgroundColor: '#fff', color: colors.text },
                ]}
                gap={12}
              />
            </View>

            {/* Butonlar */}
            <View style={{ marginTop: spacing.xl, width: '100%', alignItems: 'center', gap: 12 }}>
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
       
              </AppButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}

