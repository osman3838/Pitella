// src/redux/api/otomat.api.ts
import { baseQueryWithReauthOtomat } from '@/redux/api/base.otomat';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import type {
    NearbySiteDTO,
    NearbySitesRequestDTO,
} from '@/types/dto/otomat';

type NormalizedError = { status: number; message: string; raw?: unknown };

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

/**
 * Otomat / konum API’si
 *
 * Taban URL: OTOMAT_API_BASE_URL (base.otomat.ts)
 * Örnek endpoint:
 *   /OtomatSite/nearby_sites?lat=38.7211&lng=35.4846&min_distance=0&max_distance=10
 */
export const otomatApi = createApi({
  reducerPath: 'otomatApi',
  baseQuery: baseQueryWithReauthOtomat,
  tagTypes: ['NearbySites'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 60,

  endpoints: (b) => ({
    /**
     * Kullanıcının konumuna göre en yakın otomatları getirir.
     *
     * GET /OtomatSite/nearby_sites
     *  ?lat=...
     *  &lng=...
     *  &min_distance=0
     *  &max_distance=10
     */
    getNearbySites: b.query<NearbySiteDTO[], NearbySitesRequestDTO>({
      query: ({ lat, lng, min_distance = 0, max_distance = 10 }) => ({
        url: '/OtomatSite/nearby_sites',
        method: 'GET',
        params: {
          lat,
          lng,
          min_distance,
          max_distance,
        },
      }),
      transformErrorResponse: normalizeError,
      providesTags: (result) =>
        result
          ? [
              { type: 'NearbySites' as const, id: 'LIST' },
              ...result.map((s) => ({ type: 'NearbySites' as const, id: s.id })),
            ]
          : [{ type: 'NearbySites' as const, id: 'LIST' }],
    }),

    /**
     * (İsteğe bağlı)
     * Konumu backend’e loglamak / telemetry için kullanmak istersen.
     * Backend tarafında böyle bir endpoint yoksa bu endpoint’i silebilirsin.
     */
    sendLocation: b.mutation<{ success: boolean } | unknown, NearbySitesRequestDTO>({
      query: (body) => ({
        url: '/OtomatSite/log_location',
        method: 'POST',
        body,
      }),
      transformErrorResponse: normalizeError,
      invalidatesTags: [{ type: 'NearbySites', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetNearbySitesQuery,
  useLazyGetNearbySitesQuery,
  useSendLocationMutation,
} = otomatApi;
