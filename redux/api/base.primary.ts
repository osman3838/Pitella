import { API_BASE_URL } from '@/config/constants';
import { setTokens, signOut } from '@/redux/slices/session.slice';
import type { RootState } from '@/redux/store';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rawBase = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).session.accessToken;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  // Çerez gerekliyse 'include' yaparsın. Bearer kullanıyorsun, o yüzden 'omit' iyi.
  credentials: 'omit',
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    // 1) İlk istek
    let result = await rawBase(args, api, extraOptions);

    // 2) 401 → refresh dene
    if (result.error?.status === 401) {
      const state = api.getState() as RootState;
      const refresh = state.session.refreshToken;

      if (!refresh) {
        api.dispatch(signOut());
        return result;
      }

      const refreshResult = await rawBase(
        {
          url: '/api/auth/refresh',
          method: 'POST',
          body: { refresh_token: refresh },
        },
        api,
        extraOptions
      );

      if (refreshResult.data && typeof refreshResult.data === 'object') {
        const d = refreshResult.data as { access_token: string; refresh_token?: string | null };
        api.dispatch(
          setTokens({
            accessToken: d.access_token,
            refreshToken: d.refresh_token ?? refresh,
          })
        );
        // 3) Orijinal isteği yeni token ile tekrar et
        result = await rawBase(args, api, extraOptions);
      } else {
        api.dispatch(signOut());
      }
    }

    return result;
  };
