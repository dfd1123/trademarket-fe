import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTypedSelector } from '@/store';
import useAsyncData from '@/hooks/useAsyncData';
import { LoginInput, RegisterInput } from './types/User';
import { ConstructorParamsType } from './types/Service';
import { setAuth, resetAuth } from '@/store/auth/auth';
import { TransactionInputType } from '@/types/TransactionType';
class UserService {
  #ws;
  #cookie;
  #dispatch;

  constructor({ ws, cookie, dispatch }: ConstructorParamsType) {
    this.#ws = ws;
    this.#cookie = cookie;
    this.#dispatch = dispatch;
  }

  login(params: LoginInput) {
    const navigate = useNavigate();

    const { userid, passwd } = params;
    const loginInput: TransactionInputType = {
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
    };

    const userInfoInput: TransactionInputType = {
      Header: { function: 'D', termtype: 'HTS', trcode: 't0306' },
      Input1: {
        select_flag: '0',
        comp_code: '000',
        hts_id: userid,
        name: '',
      },
    };

    const { resultKey: loginTrCode, fetchData: loginFetch } = useAsyncData(loginInput);
    const { resultKey: userInfoTrCode, fetchData: userInfoFetch } = useAsyncData(userInfoInput);
    const loginRes = useTypedSelector((state) => state.asyncData[loginTrCode]);
    const userInfoRes = useTypedSelector((state) => state.asyncData[userInfoTrCode]);

    const loginFetchData = (params: LoginInput | undefined = undefined) => {
      if (params)
      loginInput.Input1 = {
          ...loginInput.Input1,
          userid: params.userid,
          passwd: params.passwd,
        };
        loginFetch(loginInput);
    };

    const userInfoFetchData = (userid: string) => {
      userInfoInput.Input1 = {
        ...userInfoInput.Input1,
        hts_id: userid,
      }

      userInfoFetch();
    }

    useEffect(() => {
      if (loginRes) {
        if (loginRes.Message.flag === 'E') {
          alert(loginRes.Message.data);
        } else {
          const userid = loginRes.Output1.userid;
          userInfoFetchData(userid);
        }
      }
    }, [loginRes]);

    useEffect(() => {
      if(userInfoRes && userInfoRes.Output2){
        this.#dispatch(setAuth({email: userInfoRes.Output2[0][1], szAccNo: userInfoRes.Output2[0][2], szPasswd: userInfoRes.Output2[0][3]}));
        navigate(-1);
      }
    }, [userInfoRes]);

    return { loginRes, loginFetchData };
  }

  register(params: RegisterInput) {
    const input: TransactionInputType = {
      Header: { function: 'D', termtype: 'HTS', trcode: 't113B' },
      Input1: params,
    };

    const { resultKey: registerTrCode, fetchData } = useAsyncData(input);
    const registerRes = useTypedSelector(
      (state) => state.asyncData[registerTrCode]
    );

    const registerFetchData = (
      params: RegisterInput | undefined = undefined
    ) => {
      if (params) input.Input1 = params;
      fetchData(input);
    };

    useEffect(() => {
      if (registerRes) {
        if (registerRes.Message.flag === 'E') {
          alert(registerRes.Message.data);
        }
      }
    }, [registerRes]);

    return { registerRes, registerFetchData };
  }

  logout(){
    this.#dispatch(resetAuth());
  }
}

export default UserService;
