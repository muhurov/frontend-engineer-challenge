import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

import { getTokens } from '../lib';

export const baseQuery = graphqlRequestBaseQuery({
  url: process.env.NEXT_PUBLIC_API_URL || '',
  prepareHeaders: (headers) => {
    const token = getTokens().accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
