export interface AuthState {
    accessToken: string | null;
    user: UserInfo | null;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  profile_img: string | null;
  company: string;
  birth: string;
  phone: string;
  postnum: string | null;
  address1: string;
  address2: string;
  status: number;
  status_memo: string | null;
  manage_artist: string | null;
  deleted: number;
  social: string;
  social_id: number | null;
  cardinal_num: string;
  association: string | null;
  flag_alarm: number;
}
