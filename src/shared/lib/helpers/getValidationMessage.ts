import { upperFirst } from '../strings';

export const getValidationMessage = (message?: string) => {
  if (!message) return { field: undefined, message: undefined };

  const regex = /^invalid\s+(\w+):\s+(.+)$/i;
  const match = message.match(regex);

  if (match) {
    return {
      field: match[1],
      message: upperFirst(match[2]),
    };
  }

  return { field: 'root', message: message };
};
