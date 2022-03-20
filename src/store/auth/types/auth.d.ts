export type ScreenSizeType = 'xs' | 'sm' | 'md' | 'xl';
export type LanguageType = 'KOR' | 'ENG';

export interface AuthState {
  isLoggedIn: boolean;
  language: LanguageType;
  screenSize?: ScreenSizeType;
  data: {
    szAccNo: string;
    szBankAccNo: string;
    szPasswd: string;
    jwt: string;
    email: string;
    exp: number;
    fromDt: string;
    toDt: string;
  };
  operatingHour: {
    ['nCurBusiDate(pin)']: number;
    ['nPrevBusiDate(pin)']: number;
    ['nNextBusiDate(pin)']: number;
  };
  favorites: { data: Array<any>; trReceived: boolean };
}

export interface SetUserType {
  szAccNo: string;
  szBankAccNo: string;
  email: string;
  szPasswd: string;
  jwt: string;
  exp: number;
  location: string;
  fromDt: string;
  toDt: string;
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
