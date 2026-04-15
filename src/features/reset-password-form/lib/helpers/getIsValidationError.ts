import { GraphQLErrorResponse } from '@/shared/api';

export const getIsValidationError = (error?: GraphQLErrorResponse) => {
  if (!error) return false;

  const errorMessage = error.response?.errors?.[0]?.message ?? '';

  return (
    errorMessage.startsWith('invalid email') ||
    errorMessage.startsWith('invalid password')
  );
};
