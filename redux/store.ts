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
import { otomatApi } from '@/redux/api/otomat.api';
import { sessionListener } from '@/redux/listeners/session.listener';
import checkoutReducer from '@/redux/slices/checkout.slice';
import qrScannerReducer from '@/redux/slices/qrScanner.slice';
import sessionReducer, { signOut } from '@/redux/slices/session.slice';
import { SecureStorage } from '@/storage/securePersist';

const rootReducer = combineReducers({
  session: sessionReducer,
  qrScanner: qrScannerReducer,
  checkout: checkoutReducer,
  [authApi.reducerPath]: authApi.reducer,
  [automatApi.reducerPath]: automatApi.reducer,
  [otomatApi.reducerPath]: otomatApi.reducer,
});

const persistConfig = {
  key: 'root',
  keyPrefix: '',
  storage: SecureStorage,
  whitelist: ['session'], 
  blacklist: [
    authApi.reducerPath,
    automatApi.reducerPath,
    otomatApi.reducerPath,
  ],
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const hygiene: Middleware = (api) => (next) => (action) => {
  const result = next(action);
  if (action.type === signOut.type || action.type === PURGE) {
    api.dispatch(authApi.util.resetApiState());
    api.dispatch(automatApi.util.resetApiState());
    api.dispatch(otomatApi.util.resetApiState());
  }
  return result;
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(sessionListener.middleware)
      .concat(
        authApi.middleware,
        automatApi.middleware,
        otomatApi.middleware,
        hygiene,
      ),
  devTools: __DEV__,
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
