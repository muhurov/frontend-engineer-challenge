export type GraphQLErrorResponse = {
  response: {
    errors?: Array<{
      message: string;
      extensions?: Record<string, any>;
      path?: string[];
    }>;
    status: number;
    data: any;
  };
  message: string;
};
