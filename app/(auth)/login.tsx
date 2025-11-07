// app/(auth)/login.tsx
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { Controller, FormProvider } from 'react-hook-form';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

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
import { LoginForm, loginSchema } from '@/validation/schemas/login.schema';
import { useAppSelector } from '@/redux/hooks';

const { height } = Dimensions.get('window');

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
    formState: { errors, isValid, isSubmitting },
    clearErrors,
  } = form;

  // Focus zinciri
  const passwordRef = useRef<TextInput>(null);
  const invalid = useInvalidSubmit<LoginForm>();

  const onInvalid = () =>
    invalid(errors, {
      password: passwordRef.current,
    });
""
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
      <ScrollView
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={s.header}>
          <View style={s.headerInner}>
            <Image
              source={require('@/assets/images/soupana-cover.png')}
              style={s.heroImg}
              contentFit="contain"
            />
            <View style={{ marginTop: -60 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText weight="bold" size={39} color="#fff">Soupana</AppText>
              <AppText weight="medium" size={30} color={t.colors.gray} style={{ marginTop: 4 }}>
                {' '}ile
              </AppText>
            </View>

            <AppText weight="bold" size={18} color="#fff" align="center" style={{ lineHeight: 16 }}>
              fırsatları <AppText color={t.colors.gold}>keşfet!</AppText>
            </AppText>

            <View style={{ marginTop: t.spacing.lg }} />
          </View>
        </View>

        {/* CARD */}
        <View style={s.card}>
          <AppText weight="bold" size={24} color={t.colors.text} style={s.title}>
            Giriş Yap
          </AppText>

          <FormProvider {...form}>
            <View style={{ marginTop: t.spacing.lg, gap: 12 }}>
              {/* Email/Phone */}
              <Controller
                control={form.control}
                name="email_or_phone"
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <FormTextInput
                      placeholder="E-posta ya da Telefon"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      returnKeyType="next"
                      autoCapitalize="none"
                      containerStyle={{ borderRadius: 99 }}
                      leftAdornment={
                        <Ionicons
                          name="person-circle-outline"
                          size={22}
                          color={t.colors.mutedText}
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
                        <Ionicons
                          name="lock-closed-outline"
                          size={22}
                          color={t.colors.mutedText}
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
              variant="secondary"
              style={{ width: '60%', borderRadius: 30 }}
              onPress={submit}
              loading={isLoading}
            >
              <AppText size={20} weight="bold" color="#fff">Giriş Yap</AppText>
            </AppButton>
          </View>

          {/* Social */}
          <View style={s.otherTitleWrap}>
            <AppText weight="regular" size={14} color={t.colors.mutedText}>
              Diğer giriş seçenekleri
            </AppText>
          </View>

          <View style={s.socialRow}>
            <IconButton style={{ borderRadius: 4, paddingHorizontal: 30 }} backgroundColor="#fff">
              <Icon name="Google" size={30} />
            </IconButton>

            <IconButton style={{ borderRadius: 4, paddingHorizontal: 30 }} backgroundColor="#fff">
              <Icon name="Apple" size={36} />
            </IconButton>
          </View>

          {/* Register */}
          <View style={s.registerRow}>
            <AppText weight="regular" size={14} color={t.colors.mutedText}>
              Hesabın yok mu?{' '}
            </AppText>
            <Link href="/(auth)/register" asChild>
              <AppText weight="medium" size={14} color={t.colors.secondary}>
                Kayıt Ol
              </AppText>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const useStyles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    header: {
      backgroundColor: t.colors.primaryDark,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: t.spacing.lg,
      paddingBottom: t.spacing.xl,
    },
    headerInner: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    heroImg: {
      width: 250,
      height: 250,
    },
    card: {
      marginTop: -t.radius * 2,
      backgroundColor: t.colors.surface,
      borderTopLeftRadius: t.radius * 2,
      borderTopRightRadius: t.radius * 2,
      padding: t.spacing.xl,
      minHeight: Math.max(0, height * 0.9),
    },
    title: {
      lineHeight: 28,
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
      gap: t.spacing.lg,
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
