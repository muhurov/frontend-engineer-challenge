import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { DocumentNode } from 'graphql';
import { gql } from 'graphql-request';

import {
  clearSession,
  setSession,
} from '@/entities/session/model/sessionSlice';

import { baseQuery } from './baseQuery';

const mutex = new Mutex();

export type GraphQLArgs = {
  document: string | DocumentNode;
  variables?: Record<string, any>;
};

export type GraphQLError = {
  message: string;
  stack?: string;
  name?: string;
};

export const enum ErrorStatus {
  FetchError = 'FETCH_ERROR',
}

export const baseQueryWithReauth: BaseQueryFn<
  GraphQLArgs,
  unknown,
  GraphQLError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  try {
    let result = await baseQuery(args, api, extraOptions);

    const isUnauthorized = result.error?.message
      ?.toLowerCase()
      .includes('unauthorized');

    if (isUnauthorized) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshResult = await baseQuery(
            {
              document: gql`
                mutation RefreshToken($refreshToken: String!) {
                  refreshToken(refreshToken: $refreshToken) {
                    accessToken
                    refreshToken
                  }
                }
              `,
              variables: { refreshToken: localStorage.getItem('refreshToken') },
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            api.dispatch(setSession((refreshResult.data as any).refreshToken));

            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(clearSession());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();

        result = await baseQuery(args, api, extraOptions);
      }
    }
    return result;
  } catch (error: any) {
    return {
      error: {
        status: ErrorStatus.FetchError,
        error: error.message,
        message: error.message,
      },
    };
  }
};
