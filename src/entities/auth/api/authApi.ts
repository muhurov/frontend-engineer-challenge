import { baseApi } from '@/shared/api/base';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    getSession: build.query({
      query: () => '/me',
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useGetSessionQuery } = authApi;
