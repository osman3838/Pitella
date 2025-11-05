import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    'Biennale-Regular': require('@/assets/fonts/Biennale Regular.otf'),
    'Biennale-Medium': require('@/assets/fonts/Biennale Medium.otf'),
    'Biennale-SemiBold': require('@/assets/fonts/Biennale SemiBold.otf'),
    'Biennale-Bold': require('@/assets/fonts/Biennale Bold.otf'),
    'Biennale-Book': require('@/assets/fonts/Biennale Book.otf'),
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
