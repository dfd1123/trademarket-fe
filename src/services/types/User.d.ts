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

export interface FindIdInput {
  name: string;
  phone: string;
}

export interface SendResetPasswordEmailInput {
  email: string;
}

export interface ResetPwInput {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}
export interface ProfileInput {
  id: string;
  name: string;
  birth: string;
  phone: string;
  company: string;
  address1: string;
  address2: string;
  manage_artist: string;
  'profile_img[]': any;
}

export interface GetUserListRequest {
  offset: number;
  limit: number;
  searchKeyword?: string;
  orderBy: string;
}

export interface UserListInfo {
  id: number;
  name: string | null;
  cardinal_num: string;
  company: string | null;
  profile_img: string | null;
  status: number;
}

export interface GetUserListResponse {
  users_count: number;
  users: UserListInfo[];
}
