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
          contentStyle: {
            backgroundColor: t.colors.background, 
          },
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot" />
        <Stack.Screen name="forgot-code" />
      </Stack>
    </>
  );
}
