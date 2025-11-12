import { baseQueryWithReauth } from '@/redux/api/base.primary';
import { setTokens, setUser, signOut } from '@/redux/slices/session.slice';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import {
  LoginRequestDTO,
  LoginResponseDTO,
  MeResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
  User,
} from '@/types';

type NormalizedError = { status: number; message: string; raw?: unknown };

const toDomainUser = (u: MeResponseDTO['user']): User => ({
  id: u.id,
  name: u.name ?? '',
  email: u.email ?? '',
});

const pickMessage = (data: any): string =>
  data?.message ??
  data?.error ??
  data?.detail ??
  (Array.isArray(data?.errors) ? data.errors[0] : undefined) ??
  'İstek başarısız';
  

const normalizeError = (
  res: FetchBaseQueryError | { status: number; data?: any }
): NormalizedError => {
  if ('status' in res) {
    const status = typeof res.status === 'number' ? res.status : 0;
    const data = (res as any)?.data;
    return { status, message: pickMessage(data), raw: data };
  }
  return { status: 0, message: 'Bilinmeyen hata', raw: res };
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Me'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 120,

  endpoints: (b) => ({
    login: b.mutation<LoginResponseDTO, LoginRequestDTO>({
      query: (body) => ({
        url: '/Auth/login',
        method: 'POST',
        body,
      }),
      transformErrorResponse: normalizeError,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setTokens({
              accessToken: data.access_token,
              refreshToken: data.refresh_token ?? null,
            })
          );

          dispatch(authApi.util.prefetch('me', undefined, { force: true }));
        } catch {
        }
      },
    }),

    register: b.mutation<RegisterResponseDTO, RegisterRequestDTO>({
      query: (body) => ({
        url: '/Auth/register',
        method: 'POST',
        body,
      }),
      transformErrorResponse: normalizeError,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if ('access_token' in data && data.access_token) {
            dispatch(
              setTokens({
                accessToken: data.access_token,
                refreshToken: (data as any).refresh_token ?? null,
              })
            );
            dispatch(authApi.util.prefetch('me', undefined, { force: true }));
            return;
          }

          const identifier = arg.email || arg.phone;
          if (identifier) {
            await dispatch(
              authApi.endpoints.login.initiate(
                { email_or_phone: identifier, password: arg.password },
              )
            ).unwrap();
          }
        } catch {
        }
      },
    }),

    me: b.query<User, void>({
      query: () => ({ url: '/Auth/me', method: 'GET' }),
      transformResponse: (raw: MeResponseDTO) => toDomainUser(raw.user),
      providesTags: () => [{ type: 'Me' as const, id: 'self' }],
      transformErrorResponse: normalizeError,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch {
        }
      },
    }),
    logout: b.mutation<{ success: boolean } | unknown, void>({
      query: () => ({ url: '/Auth/logout', method: 'POST' }),
      transformErrorResponse: normalizeError,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(signOut());
        dispatch(authApi.util.resetApiState());
        try {
          await queryFulfilled;
        } catch {
        }
      },
      invalidatesTags: [{ type: 'Me', id: 'self' }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useMeQuery,
  useLogoutMutation,
} = authApi;
