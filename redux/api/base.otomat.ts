// src/redux/api/base.otomat.ts
import { API_BASE_URL, OTOMAT_API_BASE_URL } from '@/config/constants';
import type { RootState } from '@/redux/store';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const makeRawBase = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).session.accessToken;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('Accept', 'application/json');
      if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
      return headers;
    },
    credentials: 'omit',
  });

/** Yalnızca access_token döndürür. Store’a yazmayız. */
let refreshPromise: Promise<string | null> | null = null;

const ensureFetchArgs = (args: string | FetchArgs): FetchArgs =>
  typeof args === 'string' ? { url: args } : { ...args };

/** Header birleştir. Authorization’ı override eder. */
const withAuthHeader = (args: FetchArgs, access: string): FetchArgs => {
  const headers = new Headers((args.headers as any) || {});
  headers.set('Authorization', `Bearer ${access}`);
  headers.set('Accept', 'application/json');
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  return { ...args, headers };
};

export const baseQueryWithReauthOtomat: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  const rawOtomat = makeRawBase(OTOMAT_API_BASE_URL);
  const rawPrimary = makeRawBase(API_BASE_URL); // refresh buradan

  // 1) İlk istek
  let res = await rawOtomat(args, api, extra);

  // 2) 401 ise refresh dene
  if (res.error?.status === 401) {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        const { refreshToken } = (api.getState() as RootState).session;
        if (!refreshToken) return null;

        const rr = await rawPrimary(
          {
            url: '/api/auth/refresh',
            method: 'POST',
            body: { refresh_token: refreshToken },
          },
          api,
          extra
        );

        if (rr.data && typeof rr.data === 'object') {
          const d = rr.data as { access_token?: string | null };
          return d.access_token ?? null; // store’a yazma
        }
        return null;
      })().finally(() => {
        refreshPromise = null;
      });
    }

    const newAccess = await refreshPromise;

    // 3) Yeni access varsa aynı isteği tek seferlik yeni header ile tekrar et
    if (newAccess) {
      const retryArgs = withAuthHeader(ensureFetchArgs(args), newAccess);
      res = await rawOtomat(retryArgs, api, extra);
    }
    // refresh başarısızsa olduğu gibi bırak. signOut yok.
  }

  return res;
};
