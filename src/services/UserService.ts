import { useEffect } from 'react';
import { useTypedSelector } from '@/store';
import useAsyncData from '@/hooks/useAsyncData';
import { TransactionInputType } from '@/types/TransactionType';
import { RegisterInput } from '@/types/services/User';
import ApiConnection from '@/modules/ApiConnection';
import cookieService from './CookieService';

class UserService {
  #api;

    constructor(){
        this.#api = new ApiConnection();
    }
    
  async emailLogin(body: {email:string, password: string}){
    const result = await this.#api.post('/login', body);

    console.log(result);

    if(result.access_token){
      cookieService.setAccessToken(result.access_token);
    }
  }

  register(params : RegisterInput) {
    const input : TransactionInputType = {
      Header: { function: 'D', termtype: 'HTS', trcode: 't113B' },
      Input1: params,
    };

    const {resultKey: registerTrCode, fetchData} = useAsyncData(input);
    const registerRes = useTypedSelector(state => state.asyncData[registerTrCode]);

    const registerFetchData = (params : RegisterInput | undefined = undefined) => {
      if(params) input.Input1 = params;
      fetchData(input);
    };

    useEffect(() => {
        if(registerRes){
          if(registerRes.Message.flag === 'E'){
            alert(registerRes.Message.data);
          }
        }
    }, [registerRes]);

    return { registerRes, registerFetchData };
  };
}


export default new UserService();
