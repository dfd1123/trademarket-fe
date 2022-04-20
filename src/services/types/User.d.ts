import { UserInfo } from '@/store/auth/types/auth';

export interface LoginInput {
  userid: string;
  passwd: string;
}
export interface EmailLoginResponse {
  access_token?: string;
  token_type?: 'bearer';
  expires_id?: number;
}

export interface RegisterInput {
  szCustNo: string;
  szFamilyName: string;
  szMemberNo: string;
  szNation_Name: string;
  szPasswd: string;
  szPasswd1: string;
  szTelNo2: string;
  szUserName: string;
}

export interface UserMarginData {
  balance: string;
  openPositionMargin: string;
  grossPnL: string;
  possibleWithdraw: string;
  maintenMargin: string;
  marginForUse: string;
  availableMargin: string;
  marginCallRate: string;
}
