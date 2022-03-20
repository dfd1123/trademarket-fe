import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LanguageType, UserInfo } from './types/auth';

const initialState: AuthState = {
  isLoggedIn: false,
  language: 'ENG' as LanguageType,
  data: {
    szAccNo: '',
    szBankAccNo: '',
    email: '',
    szPasswd: '',
    jwt: '',
    exp: 0,
    fromDt: '20200101',
    toDt: '20220101',
  },
  operatingHour: {
    ['nCurBusiDate(pin)']: 0,
    ['nPrevBusiDate(pin)']: 0,
    ['nNextBusiDate(pin)']: 0,
  },
  favorites: { data: [], trReceived: false },
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<{
        email: string;
        szAccNo: string;
        szPasswd: string;
      }>
    ) {
      const { email, szAccNo, szPasswd } = action.payload;

      if (!email) return;

      state.isLoggedIn = true;
      state.data.email = email.trim();
      state.data.szAccNo = szAccNo.trim();
      state.data.szPasswd = szPasswd.trim();
    },
    resetAuth(state) {
      state.isLoggedIn = false;
      state.language = 'ENG';
      state.data = {
        szAccNo: '',
        szBankAccNo: '',
        email: '',
        szPasswd: '',
        jwt: '',
        exp: 0,
        fromDt: '20200101',
        toDt: '20220101',
      };
      state.operatingHour = {
        ['nCurBusiDate(pin)']: 0,
        ['nPrevBusiDate(pin)']: 0,
        ['nNextBusiDate(pin)']: 0,
      };
      state.favorites = { data: [], trReceived: false };
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
