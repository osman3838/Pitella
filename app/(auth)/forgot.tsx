import { FormTextInput } from '@/components/form/FormTextInput';
import AuthLayout from '@/components/layout/AuthLayout';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Image } from 'expo-image';
import {Images} from "@/assets"
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { useTheme } from '@/hooks/useTheme';
import { useZodForm } from '@/hooks/useZodForm';

// Şema helpers tabanlı dosyadan geliyor
import {
  forgotPasswordSchema,
  type ForgotPasswordForm,
} from '@/validation/schemas';
import Icon from '@/icons';

// RTK yok: sahte istek
function mockForgotPassword(identifier: string) {
  return new Promise<{ ok: boolean }>((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() < 0.9;
      success
        ? resolve({ ok: true })
        : reject({ status: 500, message: 'Sunucu hatası oluştu' });
    }, 800);
  });
}

export default function ForgotPassword() {
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const lockRef = useRef(false);
  const [loading, setLoading] = useState(false);

  const form = useZodForm<ForgotPasswordForm>(forgotPasswordSchema, {
    defaultValues: { identifier: '' },
    mode: 'onChange',
  });

  const {
    control,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const identifier = watch('identifier');
  const keyboardType = useMemo(() => {
    // Basit sezgi: @ içeriyorsa email klavyesi, yoksa default
    return identifier?.includes('@') ? 'email-address' : 'default';
  }, [identifier]);

  const onInvalid = () => {
    Toast.show({
      type: 'error',
      text1: 'Formu kontrol et',
      text2: 'Eksik veya hatalı alan var.',
      position: 'top',
    });
    inputRef.current?.focus();
  };

  const onValid = async (data: ForgotPasswordForm) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setLoading(true);

    try {
      Keyboard.dismiss();
      await mockForgotPassword(data.identifier);

      Toast.show({
        type: 'success',
        text1: 'Bağlantı gönderildi',
        text2: 'E-posta veya SMS kutunuzu kontrol edin.',
        position: 'top',
      });

      // İstersen yönlendirme yap:
      // router.replace('/(auth)/reset-instructions');
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err?.status ? `Hata ${err.status}` : 'Hata',
        text2: err?.message || 'İşlem başarısız',
        position: 'top',
      });
    } finally {
      lockRef.current = false;
      setLoading(false);
    }
  };
  const t = useTheme();
  const { submit } = useFormSubmit(form, { onValid, onInvalid });
  const canSubmit = isValid && !isSubmitting && !loading;

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
      <View style={{ alignItems: 'center',position:"absolute",top:40,width:50,height:50,right:30,zIndex:1555}}>
        <Image source={Images.FindMail.Background01} contentFit='contain' style={{width: "100%", height: "100%"}}/>
        </View>
              <View style={{ alignItems: 'center',position:"absolute",bottom:30,width:70,height:70,left:15,zIndex:1555}}>
        <Image source={Images.FindMail.Background02} contentFit='contain' style={{width: "100%", height: "100%"}}/>
        </View>
      <View style={{ gap: 16}}>
        {/* Geri butonu */}
   
   
        
        {/* Üst blok */}
        <View style={s.header}>
 
          <AppText
            size={28}
            weight="bold"
            align="center"
            style={{ marginTop: 14, color: colors.text }}
          >
            Şifremi Unuttum
          </AppText>
          <AppText align="center" color={colors.mutedText} style={{ marginTop: 6 }}>
            Sisteme kayıtlı mail adresinizi veya telefon numaranızı giriniz.
          </AppText>
        </View>

        {/* Giriş alanı */}
        <Controller
          control={control}
          name="identifier"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <FormTextInput
                placeholder="Mail ya da Telefon"
                containerStyle={{ borderRadius: 99 }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="send"
                onSubmitEditing={submit}
                leftAdornment={
                  <Icon
                    name="User"
                    size={20}
                              color={t.colors.surface}
                  />
                }
                autoCapitalize="none"
                autoCorrect={false}
                // Eposta yazarken email klavyesi; aksi halde default
                keyboardType={keyboardType as any}
                // iOS/Android auto-complete ipuçları (email için faydalı)
                autoComplete={identifier?.includes('@') ? 'email' : 'off'}
                textContentType={identifier?.includes('@') ? 'emailAddress' : 'oneTimeCode'}
              />
              {errors.identifier && (
                <Text style={[s.err, { color: colors.danger }]}>
                  {errors.identifier.message}
                </Text>
              )}
            </>
          )}
        />


        {/* Gönder */}
        <View style={{ marginTop: 20,display:"flex",alignItems:"center" }}>
          <AppButton
            block
            round 
            variant="secondary"
                          style={{ width: '60%', borderRadius: 15 }}

            disabled={!canSubmit}
            loading={loading}
            onPress={() => router.push('/(auth)/forgot-code')}
          >
            <AppText size={20} weight="bold" color="#fff">
              Gönder
            </AppText>
          </AppButton>
        </View>
      </View>
    </AuthLayout>
  );
}

const s = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: 4,
    marginTop: 60,
    marginBottom: 8,
  },
  avatar: {
    width: 96,

    height: 96,
    borderRadius: 48,
  },
  err: { marginTop: 6, fontSize: 12 },
});
