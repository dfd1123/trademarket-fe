import { useEffect } from 'react';
import { useTypedSelector } from '@/store';
import useAsyncData from '@/hooks/useAsyncData';
import { TransactionInputType } from '@/types/TransactionType';
import { RegisterInput } from './types/User';
import ApiConnection from '@/modules/ApiConnection';
import cookieService from './CookieService';

class UserService {
  #api;

    constructor(api : ApiConnection){
        this.#api = api;
    }
    
  async emailLogin(body: {email:string, password: string}){
    const result = await this.#api.post('/login', body);

    if(result.access_token){
      cookieService.setAccessToken(result.access_token);
    }
  }

  async register(body : RegisterInput) {
    const result = await this.#api.post('/register', body);

    if(result.access_token){
      cookieService.setAccessToken(result.access_token);
    }

    return result;
  };
}


export default UserService;
