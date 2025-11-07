import * as SecureStore from 'expo-secure-store';

const ACCESS = 'accessToken';
const REFRESH = 'refreshToken';

export async function saveTokens(accessToken: string, refreshToken: string | null) {
  await SecureStore.setItemAsync(ACCESS, accessToken);
  if (refreshToken !== null && refreshToken !== undefined) {
    await SecureStore.setItemAsync(REFRESH, refreshToken);
  }
}

export async function loadTokens() {
  const accessToken = await SecureStore.getItemAsync(ACCESS);
  const refreshToken = await SecureStore.getItemAsync(REFRESH);
  return { accessToken, refreshToken };
}

export async function clearTokens() {
  await SecureStore.deleteItemAsync(ACCESS);
  await SecureStore.deleteItemAsync(REFRESH);
}
