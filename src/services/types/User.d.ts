export interface EmailLoginResponse {
  access_token?: string;
  token_type?: 'bearer';
  expires_id?: number;
}

export interface RegisterInput {
  name: string;
  email: string;
  birth: string;
  phone: string;
  company: string;
  address1: string;
  address2: string;
  password: string;
  password_confirmation: string;
}
