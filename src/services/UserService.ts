import {RegisterInput} from './types/User';
import cookieService from './CookieService';
import { ConstructorParamsType } from './types/Service';
import { UserInfo } from '@/store/auth/types/auth';
import { setAuth } from '@/store/auth/auth';
import { setPushAlarm } from '@/utils/notificationUtil';
import { TransactionInputType } from '@/types/TransactionType';
import useAsyncData from '@/hooks/useAsyncData';
import { useTypedSelector } from '@/store';
import { useEffect } from 'react';
  class UserService {
    #ws;
    #cookie;
    #dispatch;
  
    constructor({ ws, cookie, dispatch }: ConstructorParamsType) {
      this.#ws = ws;
      this.#cookie = cookie;
      this.#dispatch = dispatch;
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
  
  export default UserService;