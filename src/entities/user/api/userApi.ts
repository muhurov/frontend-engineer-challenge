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
    recoverPassword: builder.mutation({
      query: ({ email }) => ({
        document: gql`
          mutation RecoverPassword($email: String!) {
            requestPasswordReset(email: $email) {
              success
              token
            }
          }
        `,
        variables: { email },
      }),
      transformErrorResponse: transformGraphQLError,
    }),
    resetPassword: builder.mutation({
      query: ({ email, token, password }) => ({
        document: gql`
          mutation ResetPassword(
            $email: String!
            $token: String!
            $password: String!
          ) {
            resetPassword(email: $email, token: $token, newPassword: $password)
          }
        `,
        variables: { email, token, password },
      }),
      transformErrorResponse: transformGraphQLError,
    }),
  }),
});

export const {
  useCreateUserMutation,
  useRecoverPasswordMutation,
  useResetPasswordMutation,
} = userApi;
