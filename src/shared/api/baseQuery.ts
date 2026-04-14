import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export const baseQuery = graphqlRequestBaseQuery({
  url: process.env.NEXT_PUBLIC_API_URL || '',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
