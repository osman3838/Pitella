import * as SecureStore from 'expo-secure-store';
import type { Storage } from 'redux-persist';

export const SecureStorage: Storage = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};
