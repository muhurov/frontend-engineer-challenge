import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { RootState } from '@/app/store/config';
import { getTokens, removeTokens, setTokens } from '@/shared/lib';

export type SessionUser = {
  id: string;
  email: string;
};

export type SessionState = {
  isAuth: boolean;
  isHydrated: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export type SessionPayload = {
  accessToken: string;
  refreshToken: string;
};

const initialState: SessionState = {
  isAuth: false,
  isHydrated: false,
};

const applySession = (state: SessionState, payload: SessionPayload) => {
  state.isAuth = true;
  state.isHydrated = true;
  state.accessToken = payload.accessToken;
  state.refreshToken = payload.refreshToken;

  setTokens({ access: payload.accessToken, refresh: payload.refreshToken });

  Cookies.set('accessToken', payload.accessToken, { expires: 7 });
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionPayload>) => {
      applySession(state, action.payload);
    },
    clearSession: (state) => {
      state.isAuth = false;
      state.accessToken = undefined;
      state.refreshToken = undefined;

      removeTokens();
    },
    hydrateSession: (state) => {
      const { accessToken, refreshToken } = getTokens();

      if (accessToken) {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken ?? undefined;
        state.isAuth = true;
      }

      state.isHydrated = true;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export const selectSession = (state: RootState) => state.session;
