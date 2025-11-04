import { FormTextInput } from '@/components/form/FormTextInput';
import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

const { height } = Dimensions.get('window');

export default function Login() {
  const t = useTheme();
  const s = useStyles(t);
  const router = useRouter();
  const passRef = useRef<any>(null);

  const [values, setValues] = useState({ id: '', password: '' });
  const [touched, setTouched] = useState({ id: false, password: false });
  const [errors, setErrors] = useState<{ id?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!values.id) e.id = 'Bu alan zorunlu';
    if (!values.password) e.password = 'Bu alan zorunlu';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async () => {
    if (loading) return;
    setTouched({ id: true, password: true });
    if (!validate()) return;
    try {
      setLoading(true);
      router.replace('/(app)');
    } finally {
      setLoading(false);
    }
  };

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
        {/* Header */}
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
            <AppText weight="book" size={18} color="#fff" align="center" style={{ lineHeight: 16 }}>
              fırsatları <AppText color={t.colors.gold}>keşfet!</AppText>
            </AppText>
            <View style={{ marginTop: t.spacing.lg }} />
          </View>
        </View>

        {/* Card */}
        <View style={s.card}>
          <AppText weight="bold" size={24} color={t.colors.text} style={s.title}>
            Giriş Yap
          </AppText>

          <View style={{ marginTop: t.spacing.lg }}>
            <FormTextInput
              placeholder="Email yada Telefon"
              value={values.id}
              onChangeText={(txt) => setValues((sv) => ({ ...sv, id: txt }))}
              returnKeyType="next"
              onSubmitEditing={() => passRef.current?.focus()}
              leftAdornment={
                <Ionicons name="person-circle-outline" size={22} color={t.colors.mutedText} />
              }
              error={touched.id ? errors.id : undefined}
              touched={touched.id}
              containerStyle={{ borderRadius: 999 }}
            />
          </View>

          <FormTextInput
            placeholder="Parola"
            containerStyle={{ borderRadius: 999 }}
            value={values.password}
            onChangeText={(txt) => setValues((sv) => ({ ...sv, password: txt }))}
            secureTextEntry
            enablePasswordToggle
            returnKeyType="go"
            onSubmitEditing={onSubmit}
            leftAdornment={
              <Ionicons name="lock-closed-outline" size={22} color={t.colors.mutedText} />
            }
            error={touched.password ? errors.password : undefined}
            touched={touched.password}
          />

          <View style={s.forgotRow}>
            <Link href="/(auth)/forgot-password" asChild>
              <AppText
                weight="regular"
                size={14}
                color={t.colors.mutedText}
                style={{ textDecorationLine: 'underline' }}
              >
                Şifremi Unuttum
              </AppText>
            </Link>
          </View>

          {/* Primary button */}
          <AppButton
            title={loading ? 'Gönderiliyor...' : 'Giriş Yap'}
            onPress={onSubmit}
            loading={loading}
            block
            round
            style={{ marginTop: t.spacing.lg }}
          />

          <View style={s.otherTitleWrap}>
            <AppText weight="regular" size={14} color={t.colors.mutedText}>
              Diğer giriş seçenekleri
            </AppText>
          </View>

          {/* Social buttons */}
          <View style={s.socialRow}>
            <AppButton
              variant="outline"
              size="md"
              title="Google"
              leftIcon={<Ionicons name="logo-google" size={20} color={t.colors.text} />}
              style={{ minWidth: 140 }}
            />
            <AppButton
              variant="outline"
              size="md"
              title="Apple"
              leftIcon={<Ionicons name="logo-apple" size={22} color={t.colors.text} />}
              style={{ minWidth: 140 }}
            />
          </View>

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
      width: 210,
      height: 210,
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
  });
