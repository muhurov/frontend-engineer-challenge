import { configureStore } from '@reduxjs/toolkit';

import { userApi } from '@/entities/user/api/userApi';

export const createReduxStore = () => {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(userApi.middleware),
  });
};

export type AppStore = ReturnType<typeof createReduxStore>;
