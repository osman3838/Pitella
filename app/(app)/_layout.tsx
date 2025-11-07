import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';
import { Stack } from 'expo-router';
import { useAppSelector } from '@/redux/hooks';
import { useMeQuery } from '@/redux/api/auth.api';
import BottomBar from '@/components/navigation/BottomBar';

export default function AppLayout() {
  const token = useAppSelector((s) => s.session.accessToken);
  const { isFetching, isSuccess } = useMeQuery(undefined, { skip: !token });
  if (!token) return <Redirect href="/(auth)/login" />;
  if (isFetching && !isSuccess) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>

    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home"
        options={{ title: 'Anasayfa' }}
      />

    </Stack>
    <BottomBar />
    </>
  );
}
