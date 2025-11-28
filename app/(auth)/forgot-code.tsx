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

import { StyleSheet } from 'react-native';
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
          <Link href="/(auth)/login" style={{ color: colors.mutedText }}>
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
                boxStyle={styles.otpBox}
                value={code}
                onChangeText={setCode}
                // onComplete={(full) => { /* istersen burada butonsuz submit */ }}
                keyboardType="number-pad"
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
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
  },
  helper: {
    marginTop: 4,
    opacity: 0.7,
  },
  inputWrapper: {
    marginTop: 32,
  },
  otpBox: {
    width: 52,
    height: 72,
    borderRadius: 18,
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'center',
    fontSize: 32,
    fontWeight: '700',
    // shadow (Android + iOS)
    elevation: 4,
    shadowColor: '#00000022',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
});