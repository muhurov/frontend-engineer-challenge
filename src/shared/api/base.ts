import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export const baseQuery = graphqlRequestBaseQuery({
  url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
});
