import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared/api/base';

export const createReduxStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof createReduxStore>;
