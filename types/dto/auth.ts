export type LoginRequestDTO = {
  email_or_phone: string;
  password: string;
};

export type LoginResponseDTO = {
  access_token: string;
  refresh_token?: string | null;
};

export type RegisterRequestDTO = {
  name: string;
  surname: string;
  email: string;
  password: string;
  
  password_confirmation: string;
};

export type RegisterResponseDTO = {
  access_token: string;
  refresh_token?: string | null;
};

export type MeResponseDTO = {
  user: {
    id: number;
    name: string | null;
    email: string | null;
  };
};
