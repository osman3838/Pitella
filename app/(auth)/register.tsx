import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { FormTextInput } from '@/components/form/FormTextInput';
import AuthLayout from '@/components/layout/AuthLayout';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { ConsentItem } from '@/components/ui/ConsentItem';

import { useTheme } from '@/hooks/useTheme';
import { useRegisterMutation } from '@/redux/api/auth.api';
import { Link, router } from 'expo-router';

import { RegisterForm, registerSchema } from '@/validation/schemas';
import { Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { useFormSubmit } from '@/hooks/useFormSubmit';
import { useZodForm } from '@/hooks/useZodForm';
import { applyServerErrors, focusFirstError } from '@/utils/forms/errors';
import type { ServerErrors } from '@/utils/forms/types';
import { Image } from 'expo-image';
import {Images} from "@/assets"
import Icon from '@/icons';

export default function Register() {
  const { colors } = useTheme();
  const [registerReq, { isLoading }] = useRegisterMutation();

  // Refs ilk hataya atlamak için
  const surnameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  // RHF + Zod
  const form = useZodForm<RegisterForm>(registerSchema, {
    defaultValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
      confirm: '',
      invite_code: '',
      kvkk: false,
      contract: false,
    },
  });

  const {
    control,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const kvkk = watch('kvkk');
  const contract = watch('contract');

  // Backend hata yayma
  const onInvalid = () => {
    Toast.show({ type: 'error', text1: 'Formu kontrol et', text2: 'Eksik veya hatalı alanlar var.', position: 'top' });
    focusFirstError<RegisterForm>(errors, {
      surname: surnameRef.current,
      phone:   phoneRef.current,
      email:   emailRef.current,
      password: passwordRef.current,
      confirm:  confirmRef.current,
      // name için submitEditing ile ilerliyoruz, ayrıca ref’e gerek yok
    });
  };

  const onValid = async (data: RegisterForm) => {
    clearErrors();
    try {
      await registerReq({
        name: data.name.trim(),
        surname: data.surname.trim(),
        phone: data.phone || undefined,
        email: data.email,
        password: data.password,
        invite_code: data.invite_code?.trim() || undefined,
      }).unwrap();

      Toast.show({ type: 'success', text1: 'Kayıt başarılı', position: 'top' });
      router.replace('/(auth)/login');
    } catch (e: any) {
      const status = e?.status ?? 0;
      const raw = e?.raw ?? e?.data;
      const message = e?.message || 'Kayıt başarısız';

      const possibleErrors: ServerErrors =
        raw?.errors || raw?.detail || raw?.error || raw?.message;

      applyServerErrors<RegisterForm>(possibleErrors, setError);

      Toast.show({
        type: 'error',
        text1: status ? `${status}` : 'Hata',
        text2: String(message),
        position: 'top',
      });

      onInvalid();
    }
  };

  // Ortak submit sarmalayıcı
  const { submit } = useFormSubmit(form, { onValid, onInvalid });


  return (
    <AuthLayout
      title="Kayıt Ol"
      cta={null}
      footer={
        <AppText align="center" color={colors.icon}>
          Zaten hesabın var mı?{' '}
          <Link href="/(auth)/login" style={{ color: colors.tint }}>
            Giriş Yap
          </Link>
        </AppText>
      }
    >
      <View style={{ gap: 12,position:"relative",zIndex:-1 }}>
        <View style={{position:"absolute",top:-130,right:-10,zIndex:8982}}>
          <Image source={Images.Register.Background01}  contentFit='contain' style={{width:100,height:100}}/>
        </View>
           <View style={{position:"absolute",bottom:35,right:0}}>
          <Image source={Images.Register.Background02}  contentFit='contain' style={{width:50,height:50}}/>
        </View>
        <Controller
          control={control}
          name="name"
        
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <FormTextInput
                placeholder="Ad"
                containerStyle={{ borderRadius: 99 }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={() => surnameRef.current?.focus()}
                leftAdornment={<Icon name="User" size={20} color={colors.surface} />}
              />
              {errors.name && <Text style={[s.err, { color: colors.danger }]}>{errors.name.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="surname"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <FormTextInput
                ref={surnameRef}
                placeholder="Soyad"
                containerStyle={{ borderRadius: 99 }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={() => phoneRef.current?.focus()}
                leftAdornment={<Icon name="User" size={20} color={colors.surface} />}
              />
              {errors.surname && <Text style={[s.err, { color: colors.danger }]}>{errors.surname.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <FormTextInput
                ref={phoneRef}
                placeholder="Telefon (opsiyonel)"
                containerStyle={{ borderRadius: 99 }}
                keyboardType="phone-pad"
                value={value ?? ''}
                onChangeText={onChange}
                onBlur={onBlur}

                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                leftAdornment={<Icon name="Phone" size={20} color={colors.mutedText} />}
              />
              {errors.phone && <Text style={[s.err, { color: colors.danger }]}>{errors.phone.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <FormTextInput
                ref={emailRef}
                placeholder="E-posta"
                containerStyle={{ borderRadius: 99 }}
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                leftAdornment={<Icon name="Mail" size={20} color={colors.mutedText} />}
              />
              {errors.email && <Text style={[s.err, { color: colors.danger }]}>{errors.email.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <FormTextInput
                ref={passwordRef}
                placeholder="Parola"
                containerStyle={{ borderRadius: 99 }}
                secureTextEntry
                enablePasswordToggle
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={() => confirmRef.current?.focus()}
                leftAdornment={<Icon name="Lock" size={20} color={colors.surface} />}
              />
              {errors.password && <Text style={[s.err, { color: colors.danger }]}>{errors.password.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="confirm"
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <FormTextInput
                ref={confirmRef}
                placeholder="Parola tekrar"
                containerStyle={{ borderRadius: 99 }}
                secureTextEntry
                enablePasswordToggle
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="done"
                onSubmitEditing={submit}
                leftAdornment={<Icon name="Lock" size={20} color={colors.surface} />}
              />
              {errors.confirm && <Text style={[s.err, { color: colors.danger }]}>{errors.confirm.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="invite_code"
          render={({ field: { value, onChange, onBlur } }) => (
            <FormTextInput
              placeholder="Davet Kodu (opsiyonel)"
              containerStyle={{ borderRadius: 99 }}
              value={value ?? ''}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="characters"
              leftAdornment={<Ionicons name="qr-code-outline" size={20} color={colors.mutedText} />}
            />
          )}
        />

        <ConsentItem
          checked={kvkk}
          onChange={v => setValue('kvkk', v, { shouldValidate: true })}
          text="Aydınlatma metnini okudum."
          actionText="Aydınlatma Metni"
          onActionPress={() => {}}
        />
        {errors.kvkk && <Text style={[s.err, { color: colors.danger }]}>{String(errors.kvkk.message)}</Text>}

        <ConsentItem
          checked={contract}
          onChange={v => setValue('contract', v, { shouldValidate: true })}
          title="Kullanıcı Sözleşmesi"
          text="Sözleşmeyi okudum ve kabul ediyorum."
        />
        {errors.contract && <Text style={[s.err, { color: colors.danger }]}>{String(errors.contract.message)}</Text>}

          <View style={{ flexDirection: 'row', justifyContent: 'center' ,marginTop:40}}>
                   <AppButton
                     block
                     round
                     align='center'
                     variant="secondary"
                     style={{ width: '60%', borderRadius: 15 }}
                     onPress={submit}
                     loading={isLoading}
                   >
                     <AppText size={20} align='left' weight="bold" color="#fff">Kayıt Ol</AppText>
                   </AppButton>
                 </View>
       
      </View>
    </AuthLayout>
  );
}

const s = StyleSheet.create({
  err: { marginTop: 4, fontSize: 12 },
});
