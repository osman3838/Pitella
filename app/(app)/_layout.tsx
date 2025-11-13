import BottomBar from '@/components/navigation/BottomBar';
import Header from '@/components/navigation/Header';
import { useMeQuery } from '@/redux/api/auth.api';
import { useAppSelector } from '@/redux/hooks';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

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
    <Header/>
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home"
        options={{ title: 'Anasayfa' ,headerShown:false}}
        
      />

      <Stack.Screen
        name="pay"
        options={{ title: 'Ödeme' ,headerShown:false}}

      />
      <Stack.Screen
        name="profile"
        options={{ title: 'Profil' ,headerShown:false}}

      />
    </Stack>
    <BottomBar />
    </>
  );
}
