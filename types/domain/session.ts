import type { User } from '@/types/domain/user';

export type SessionState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
};
