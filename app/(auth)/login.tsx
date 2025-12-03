// app/(auth)/login.tsx
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { useRef } from 'react';
import { Controller, FormProvider } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Images } from '@/assets/index';
import { FormTextInput } from '@/components/form/FormTextInput';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { IconButton } from '@/components/ui/IconButton';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';

import { useFormSubmit } from '@/hooks/useFormSubmit';
import { useInvalidSubmit } from '@/hooks/useInvalidSubmit';
import { useZodForm } from '@/hooks/useZodForm';

import { useLoginMutation } from '@/redux/api/auth.api';
import { useAppSelector } from '@/redux/hooks';
import { LoginForm, loginSchema } from '@/validation/schemas/login.schema';

export default function Login() {
  const t = useTheme();
  const s = useStyles(t);
  const token = useAppSelector((s) => s.session);
  console.log(token);

  const [loginReq, { isLoading }] = useLoginMutation();

  const form = useZodForm<LoginForm>(loginSchema, {
    defaultValues: {
      email_or_phone: '',
      password: '',
    },
    mode: 'onChange',
  });

  const {
    formState: { errors },
    clearErrors,
  } = form;

  const passwordRef = useRef<TextInput>(null);
  const invalid = useInvalidSubmit<LoginForm>();

  const onInvalid = () =>
    invalid(errors, {
      password: passwordRef.current,
    });

  const onValid = async (data: LoginForm) => {
    clearErrors();
    try {
      await loginReq({
        email_or_phone: data.email_or_phone.trim(),
        password: data.password,
      }).unwrap();

      Toast.show({ type: 'success', text1: 'Giriş başarılı', position: 'top' });
    } catch (e: any) {
      const status = e?.status ?? 0;
      const message = e?.message || 'Giriş başarısız';
      Toast.show({
        type: 'error',
        text1: status ? `${status}` : 'Hata',
        text2: String(message),
        position: 'top',
      });
      onInvalid();
    }
  };

  const { submit } = useFormSubmit(form, { onValid, onInvalid });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: t.colors.primaryDark }}>
        <ScrollView
          bounces={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <View style={s.header}>
            <View style={s.headerInner}>
              <Image
                source={Images.Home.Cover}
                contentFit="contain"
                style={{ width: 370, height: 340, marginTop: -10 }}
              />
            </View>
            <View style={{position:"absolute",bottom:-42,right:40}}>

  <Image contentFit='contain' source={Images.Login.Background03} style={{width: 100, height: 90}}/>
</View>
          </View>

          {/* CARD */}
          <View style={s.card}>
<View style={{position:"absolute",bottom:100,left:10}}>

  <Image contentFit='contain' source={Images.Login.Background01} style={{width: 80, height: 110}}/>
</View>
<View style={{position:"absolute",bottom:0,right:-8}}>

  <Image contentFit='contain' source={Images.Login.Background02} style={{width: 70, height: 90}}/>
</View>

            <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
              <AppText
                weight="bold"
                size={24}
                color={t.colors.text}
                style={s.title}
              >
                Giriş Yap
              </AppText>

              <FormProvider {...form}>
                <View style={{ marginTop: 20, gap: 12 }}>
                  {/* Email/Phone */}
                  <Controller
                    control={form.control}
                    name="email_or_phone"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        <FormTextInput
                          placeholder="Email yada Telefon"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          returnKeyType="next"
                          autoCapitalize="none"
                          containerStyle={{ borderRadius: 99 }}
                          leftAdornment={
                            <Icon
                              color={t.colors.surface}
                              size={20}
                              name="User"
                            />
                          }
                          onSubmitEditing={() => passwordRef.current?.focus()}
                        />
                        {errors.email_or_phone && (
                          <Text style={[s.err, { color: t.colors.danger }]}>
                            {errors.email_or_phone.message}
                          </Text>
                        )}
                      </>
                    )}
                  />

                  {/* Password */}
                  <Controller
                    control={form.control}
                    name="password"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        <FormTextInput
                          ref={passwordRef}
                          placeholder="Parola"
                          secureTextEntry
                          enablePasswordToggle
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          returnKeyType="go"
                          containerStyle={{ borderRadius: 99 }}
                          leftAdornment={
                            <Icon
                              size={18}
                              color={t.colors.surface}
                              name="Lock"
                            />
                          }
                          onSubmitEditing={submit}
                        />
                        {errors.password && (
                          <Text style={[s.err, { color: t.colors.danger }]}>
                            {errors.password.message}
                          </Text>
                        )}
                      </>
                    )}
                  />
                </View>
              </FormProvider>

              {/* Forgot password */}
              <View style={s.forgotRow}>
                <Link href="/(auth)/forgot" asChild>
                  <AppText
                    weight="regular"
                    size={14}
                    color={t.colors.mutedText}
                    style={{ textDecorationLine: 'none' }}
                  >
                    Şifremi Unuttum
                  </AppText>
                </Link>
              </View>

              {/* Button */}
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <AppButton
                  block
                  round
                  variant="primary"
                  style={{
                    width: '60%',
                    borderRadius: 20,
                    marginTop: 15,
                  }}
                  onPress={submit}
                  loading={isLoading}
                >
                  <AppText size={25} weight="bold" color="#fff">
                    Giriş Yap
                  </AppText>
                </AppButton>
              </View>

              {/* Social */}
              <View style={s.otherTitleWrap}>
                <AppText
                  weight="regular"
                  size={14}
                  color={t.colors.mutedText}
                >
                  Diğer giriş seçenekleri
                </AppText>
              </View>

              <View style={s.socialRow}>
                <IconButton
                  style={{ borderRadius: 7, paddingHorizontal: 30 }}
                  backgroundColor="#fff"
                >
                  <Icon name="Google" size={30} />
                </IconButton>

                <IconButton
                  style={{ borderRadius: 7, paddingHorizontal: 30 }}
                  backgroundColor="#fff"
                >
                  <Icon name="Apple" size={36} />
                </IconButton>
              </View>

              {/* Register */}
              <View style={s.registerRow}>
                <AppText
                  weight="regular"
                  size={14}
                  color={t.colors.mutedText}
                >
                  Hesabın yok mu?{' '}
                </AppText>
                <Link href="/(auth)/register" asChild>
                  <AppText
                    weight="medium"
                    size={14}
                    color={t.colors.secondary}
                  >
                    Kayıt Ol
                  </AppText>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const useStyles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    header: {
      flex: 1,
      alignItems: 'center',

      justifyContent: 'center',
      zIndex:10,
    },
    headerInner: {
      alignItems: 'center',
      
      justifyContent: 'center',
      zIndex:-4,
    
      gap: 6,
    },

    card: {
      backgroundColor: t.colors.borderDark,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position:"relative",
      padding: t.spacing.xl,
      overflow: 'hidden',
    },

    title: {
      lineHeight: 28,
      marginLeft: 8,
    },
    forgotRow: {
      alignItems: 'flex-end',
      marginTop: t.spacing.sm,
      marginBottom: t.spacing.md,
    },
    otherTitleWrap: {
      alignItems: 'center',
      marginTop: t.spacing.xl,
      marginBottom: t.spacing.md,
    },
    socialRow: {
      flexDirection: 'row',
      gap: t.spacing.sm,
      justifyContent: 'center',
    },
    registerRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: t.spacing.xl,
    },
    err: { marginTop: 4, fontSize: 12 },
  });
