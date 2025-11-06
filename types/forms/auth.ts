// src/types/form/auth.ts
export type LoginFormValues = {
  id: string;
  password: string;
};

export type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
