import { useEffect } from 'react';
import { useTypedSelector } from '@/store';
import useAsyncData from '@/hooks/useAsyncData';
import { TransactionInputType } from '@/types/TransactionType';
import { FindIdInput, RegisterInput, ResetPwInput, SendResetPasswordEmailInput } from './types/User';
import ApiConnection from '@/modules/ApiConnection';
import cookieService from './CookieService';

class UserService {
  #api;

  constructor(api: ApiConnection) {
    this.#api = api;
  }

  async emailLogin(body: { email: string; password: string }) {
    const result = await this.#api.post('/login', body);

    if (result.access_token) {
      cookieService.setAccessToken(result.access_token);
    }

    return result;
  }

  async register(body: RegisterInput) {
    const result = await this.#api.post('/register', body);

    if (result.access_token) {
      cookieService.setAccessToken(result.access_token);
    }

    return result;
  };

  logout(){
    return this.#api.post('/logout');
  }

  findId(body : FindIdInput){
    return this.#api.post('/find_id', body);
  }

  sendResetPasswordEmail(body : SendResetPasswordEmailInput){
    return this.#api.post('find_pw', body);
  }

  resetPw(body : ResetPwInput){
    return this.#api.post('reset_pw', body);
  }

  getProfile(body: { id: number }) {
    return this.#api.get('/user/view', body);
  }

  getMyUserInfo(){
    return this.#api.get('/profile');
  }
}

export default UserService;
