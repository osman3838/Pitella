import { useTheme } from '@/hooks/useTheme';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

/**
 * Sadece AUTH ekranları için layout.
 * - Header yok (ekranlar kendi görsel üst başlığını çiziyor)
 * - Arka plan/animasyon ayarları tek noktada
 * - initialRoute login
 */
export default function AuthLayout() {
  const t = useTheme();

  return (
    <>
      {/* Lacivert üst alanlarınızda metinler beyaz, status bar da öyle olsun */}

      <Stack
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
          animation: Platform.select({
            ios: 'slide_from_right',
            android: 'fade_from_bottom',
            default: 'fade',
          }),
          presentation: 'card',
          // Auth ekranlarının genel zeminini burada kontrol edebilirsiniz
          contentStyle: {
            backgroundColor: t.colors.background, // kart zemini için açık gri kullanıyorsanız surface de verebilirsiniz
          },
        }}
      >
        {/* Ekran dosyalarınız: app/(auth)/login.tsx, register.tsx, forgot-password.tsx, verify-code.tsx, reset-password.tsx */}
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="verify-code" />
        <Stack.Screen name="reset-password" />
      </Stack>
    </>
  );
}
