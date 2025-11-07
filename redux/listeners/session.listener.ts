import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { setTokens, signOut } from '@/redux/slices/session.slice';
import { saveTokens, clearTokens } from '@/storage/session';

export const sessionListener = createListenerMiddleware();

sessionListener.startListening({
  matcher: isAnyOf(setTokens, signOut),
  effect: async (action) => {
    if (setTokens.match(action)) {
      const { accessToken, refreshToken = null } = action.payload;
      await saveTokens(accessToken, refreshToken);
      return;
    }
    if (signOut.match(action)) {
      await clearTokens();
    }
  },
});
