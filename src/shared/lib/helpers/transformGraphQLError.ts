import { GraphQLErrorResponse } from '@/shared/api/types';

export const transformGraphQLError = (response: any): GraphQLErrorResponse => {
  try {
    if (
      typeof response.message === 'string' &&
      response.message.includes('{"response"')
    ) {
      const jsonPart = response.message.split(': {')[1];
      const parsed = JSON.parse('{' + jsonPart);

      return parsed;
    }
  } catch (e) {
    return response.message || 'Ошибка парсинга';
  }

  return response.message;
};
