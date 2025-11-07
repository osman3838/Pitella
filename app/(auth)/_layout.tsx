import { useTheme } from '@/hooks/useTheme';
import { useAppSelector } from '@/redux/hooks';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function AuthLayout() {
  const t = useTheme();
  const token = useAppSelector((s) => s.session.accessToken);

  if (token) {
    return <Redirect href="/(app)/home" />;
  }

  return (
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
  );
}
