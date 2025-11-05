import { FormTextInput } from '@/components/form/FormTextInput';
import AuthLayout from '@/components/layout/AuthLayout';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { Link, router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function Register() {
  const { colors } = useTheme();
  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirm: '',
  });

  const surnameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const handleChange = (key: keyof typeof values, val: string) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleRegister = () => {
    // TODO: backend API call veya validation buraya
    router.replace('/(tabs)');
  };

  return (
    <AuthLayout
      title="Kayıt Ol"
      cta={<AppButton title="Kayıt Ol" onPress={handleRegister} />}
      footer={
        <AppText align="center" color={colors.icon}>
          Zaten hesabın var mı?{' '}
          <Link href="/(auth)/login" style={{ color: colors.tint }}>
            Giriş Yap
          </Link>
        </AppText>
      }
    >
      <View style={{ gap: 12 }}>
        <FormTextInput
          placeholder="Ad"
          containerStyle={{ borderRadius: 99 }}
          
          value={values.name}
          onChangeText={(v) => handleChange('name', v)}
          returnKeyType="next"
          onSubmitEditing={() => surnameRef.current?.focus()}
          
        />

        <FormTextInput
          ref={surnameRef}
          placeholder="Soyad"
          containerStyle={{ borderRadius: 99 }}
          value={values.surname}
          onChangeText={(v) => handleChange('surname', v)}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />

        <FormTextInput
          ref={emailRef}
          placeholder="E-posta"
          containerStyle={{ borderRadius: 99 }}
          value={values.email}
          onChangeText={(v) => handleChange('email', v)}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <FormTextInput
          ref={passwordRef}
          placeholder="Parola"
          value={values.password}
          containerStyle={{ borderRadius: 99 }}
          onChangeText={(v) => handleChange('password', v)}
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => confirmRef.current?.focus()}
        />

        <FormTextInput
          ref={confirmRef}
          placeholder="Parola Tekrar"
          containerStyle={{ borderRadius: 99 }}
          value={values.confirm}
          onChangeText={(v) => handleChange('confirm', v)}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleRegister}
        />
        <AppButton variant='secondary' round   onPress={handleRegister} >
                  <AppText
                  size={23}
                  color='white'
                  weight='bold'
                  >Kayıt Ol</AppText>
                 </AppButton> 
      </View> 
    </AuthLayout>
  );
}

const s = StyleSheet.create({
  link: {
    textAlign: 'center',
    fontSize: 14,
  },
});
