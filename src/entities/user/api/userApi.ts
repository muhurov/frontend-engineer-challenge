import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';

import { baseQuery } from '@/shared/api/base';
import { transformGraphQLError } from '@/shared/lib';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ email, password }) => ({
        document: gql`
          mutation Register($email: String!, $password: String!) {
            register(email: $email, password: $password) {
              id
              email
              status
            }
          }
        `,
        variables: { email, password },
      }),
      transformErrorResponse: transformGraphQLError,
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
