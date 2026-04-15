import { gql } from 'graphql-request';

import { baseApi } from '@/shared/api';
import { transformGraphQLError } from '@/shared/lib';

import { sessionSlice } from '../model';

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        document: gql`
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              accessToken
              refreshToken
              user {
                id
                email
              }
            }
          }
        `,
        variables: { email, password },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.login) {
            dispatch(
              sessionSlice.actions.setSession({
                accessToken: data.login.accessToken,
                refreshToken: data.login.refreshToken,
              }),
            );
          }
        } catch (error) {
          console.log('Login error in onQueryStarted:', error);
        }
      },

      transformErrorResponse: transformGraphQLError,
    }),
    getMe: builder.query({
      query: () => ({
        document: gql`
          query {
            me {
              id
              email
              status
            }
          }
        `,
      }),
      providesTags: ['User'],
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useGetMeQuery } = sessionApi;
