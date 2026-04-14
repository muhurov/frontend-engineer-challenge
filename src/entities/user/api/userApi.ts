import { gql } from 'graphql-request';

import { baseApi } from '@/shared/api';
import { transformGraphQLError } from '@/shared/lib';

export const userApi = baseApi.injectEndpoints({
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
