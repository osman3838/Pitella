// src/redux/store.ts
import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { authApi } from '@/redux/api/auth.api';
import { automatApi } from '@/redux/api/automat.api';
import { sessionListener } from '@/redux/listeners/session.listener'; // ← EKLENDİ
import sessionReducer, { signOut } from '@/redux/slices/session.slice';
import { SecureStorage } from '@/storage/securePersist';

// --------------------- Root Reducer ---------------------
const rootReducer = combineReducers({
  session: sessionReducer,
  [authApi.reducerPath]: authApi.reducer,
  [automatApi.reducerPath]: automatApi.reducer,
});

// --------------------- Persist Config ---------------------
const persistConfig = {
  key: 'root',
  keyPrefix: '', // ':' kalktı çünkü SecureStore ':' kabul etmez
  storage: SecureStorage,
  whitelist: ['session'],
  blacklist: [authApi.reducerPath, automatApi.reducerPath],
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// --------------------- Hygiene Middleware ---------------------
const hygiene: Middleware = (api) => (next) => (action) => {
  const result = next(action);
  if (action.type === signOut.type || action.type === PURGE) {
    api.dispatch(authApi.util.resetApiState());
    api.dispatch(automatApi.util.resetApiState());
  }
  return result;
};

// --------------------- Store ---------------------
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(sessionListener.middleware) // ← listener middleware en öne
      .concat(authApi.middleware, automatApi.middleware, hygiene),
  devTools: __DEV__,
});

// --------------------- Persistor & Setup ---------------------
export const persistor = persistStore(store);
setupListeners(store.dispatch);

// --------------------- Types ---------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
