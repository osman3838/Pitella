import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauthOtomat } from './base.otomat';  

export const automatApi = createApi({
  reducerPath: 'automatApi',
  baseQuery: baseQueryWithReauthOtomat,
  endpoints: (b) => ({
    listSites: b.query<any, void>({
      query: () => ({ url: '/OtomatSite/list_sites', method: 'GET' }),
    }),
  }),
});

export const { useListSitesQuery } = automatApi;
