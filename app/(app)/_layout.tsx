import BottomBar from '@/components/navigation/BottomBar';
import Header from '@/components/navigation/Header';
import { useMeQuery } from '@/redux/api/auth.api';
import { useAppSelector } from '@/redux/hooks';
import { Redirect, Stack, usePathname } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const BOTTOM_HIDDEN_ROUTES = [

];

export default function AppLayout() {
  const token = useAppSelector((s) => s.session.accessToken);
  const { isFetching, isSuccess } = useMeQuery(undefined, { skip: !token });
  const pathname = usePathname();

  if (!token) return <Redirect href="/(auth)/login" />;

  if (isFetching && !isSuccess) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const showBottomBar = !BOTTOM_HIDDEN_ROUTES.includes(pathname);

  return (
    <>
      <Stack
        initialRouteName="checkout"
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            header: () => <Header />,
          }}
        />

        <Stack.Screen
          name="home"
          options={{
            title: 'Anasayfa',
            header: () => <Header  />,
          }}
        />

        <Stack.Screen
          name="pay"
          options={{
            title: 'Ödeme',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="profile"
          options={{
            title: 'Profil',
            header: () => <Header />,
          }}
        />
        <Stack.Screen
          name="automat"
          options={{
            
            header: () => <Header  />,
          }}
        />

        <Stack.Screen
          name="checkout"
          options={{
            title: 'Çorba Kodu',
            header: () => <Header  />,
          }}
        />
        <Stack.Screen
          name="campaigns"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      {showBottomBar && <BottomBar />}
    </>
  );
}
