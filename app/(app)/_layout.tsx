import BottomBar from '@/components/navigation/BottomBar';
import Header from '@/components/navigation/Header';
import { useMeQuery } from '@/redux/api/auth.api';
import { useAppSelector } from '@/redux/hooks';
import { Redirect, Stack, usePathname } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';

export default function AppLayout() {
  const token = useAppSelector((s) => s.session.accessToken);
  const { isFetching, isSuccess } = useMeQuery(undefined, { skip: !token });
  const pathname = usePathname();

  if (!token) return <Redirect href="/(auth)/login" />;

  if (isFetching && !isSuccess) {
    return (
      <View style={styles.loaderRoot}>
        <ActivityIndicator />
      </View>
    );
  }

  // campaigns ekranında bottom bar gizle
  const showBottomBar = !pathname.startsWith('/campaigns');

  return (
    <View style={styles.root}>
      <View style={styles.appContainer}>
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
              header: () => <Header />,
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
              header: () => <Header />,
            }}
          />

          <Stack.Screen
            name="checkout"
            options={{
              title: 'Pizza Kodu',
              header: () => <Header />,
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 12,
  },
  appContainer: {
    flex: 1,
    maxWidth: 480,           
    width: '90%',
    alignSelf: 'center',
    borderRadius: 24,
  },
  loaderRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECECEC',
  },
});
