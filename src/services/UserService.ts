import {LoginInput, RegisterInput} from './types/User';
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

    login(params : LoginInput){
      const {userid, passwd} = params;
      const input : TransactionInputType = {
        Header: { function: 'D', termtype: 'HTS', trcode: 'login' },
        Input1: {
          userid: userid,
          passwd: passwd,
          // ipaddr: "211.13.238.186",
          ibno: '000',
          usertype: '4',
          demo: '0',
          retry: '1',
          usecert: '',
          version: '00',
          mac_addr: '',
        },
      }

      const {resultKey: loginTrCode, fetchData} = useAsyncData(input);
        const loginRes = useTypedSelector(state => state.asyncData[loginTrCode]);
    
        const loginFetchData = (params : LoginInput | undefined = undefined) => {
          if(params) input.Input1 = {...input.Input1, userid: params.userid, passwd: params.passwd};
          fetchData(input);
        };
    
        useEffect(() => {
            if(loginRes){
              if(loginRes.Message.flag === 'E'){
                alert(loginRes.Message.data);
              }
            }
        }, [loginRes]);
    
        return { loginRes, loginFetchData };
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