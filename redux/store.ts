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
import sessionReducer, { signOut } from '@/redux/slices/session.slice';
import { SecureStorage } from '@/storage/securePersist';

const rootReducer = combineReducers({
  session: sessionReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: SecureStorage,
  whitelist: ['session'],
  blacklist: [authApi.reducerPath],
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const hygiene: Middleware = (api) => (next) => (action) => {
  const result = next(action);
  if (action.type === signOut.type || action.type === PURGE) {
    api.dispatch(authApi.util.resetApiState());
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
    }).concat(authApi.middleware, hygiene),
  devTools: __DEV__,
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
