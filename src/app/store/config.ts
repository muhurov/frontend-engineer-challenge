import { configureStore } from '@reduxjs/toolkit';

import { sessionSlice } from '@/entities/session';
import { baseApi } from '@/shared/api';

export const createReduxStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [sessionSlice.name]: sessionSlice.reducer,
    },
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
  });
};

const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = typeof store.dispatch;
