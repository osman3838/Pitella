import type { SessionState } from '@/types/domain/session';
import type { User } from '@/types/domain/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SessionState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken?: string | null }>
    ) => {
      state.accessToken = action.payload.accessToken;

      if (action.payload.refreshToken !== undefined) {
        state.refreshToken = action.payload.refreshToken;
      }
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    signOut: () => initialState,
  },
});

export const { setTokens, setUser, signOut } = sessionSlice.actions;
export default sessionSlice.reducer;
