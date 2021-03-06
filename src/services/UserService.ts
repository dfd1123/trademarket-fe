import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTypedSelector } from '@/store';
import useAsyncData from '@/hooks/useAsyncData';
import { LoginInput, RegisterInput, UserMarginData } from './types/User';
import { ConstructorParamsType } from './types/Service';
import { setAuth, resetAuth } from '@/store/auth/auth';
import { TransactionInputType } from '@/types/TransactionType';
import useUserData from '@/hooks/useUserData';
import { formatNumber } from '@/utils/numberUtils';
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

    const userDetailInfoInput: TransactionInputType = {
      Header: { function: 'D', termtype: 'HTS', trcode: 't113C' },
      Input1: {
        szFlag: '0',
        szMemberNo: '000',
        szCustNo: userid,
        szPasswd: passwd,
        szUHIN_data: '',
        szField_No: '',
        szField_Data1: '',
        szField_Data2: '',
        szField_Data3: '',
        szStaffID: '',
        szStaffPasswd: '',
      },
    };

    const { resultKey: loginTrCode, fetchData: loginFetch } =
      useAsyncData(loginInput);
    const { resultKey: userInfoTrCode, fetchData: userInfoFetch } =
      useAsyncData(userInfoInput);
    const { resultKey: userDetailInfoTrCode, fetchData: userDetailInfoFetch } =
      useAsyncData(userDetailInfoInput);

    const loginRes = useTypedSelector((state) => state.asyncData[loginTrCode]);
    const userInfoRes = useTypedSelector(
      (state) => state.asyncData[userInfoTrCode]
    );
    const userDetailInfoRes = useTypedSelector(
      (state) => state.asyncData[userDetailInfoTrCode]
    );

    const loginFetchData = (params: LoginInput | undefined = undefined) => {
      if (params) {
        loginInput.Input1 = {
          ...loginInput.Input1,
          userid: params.userid,
          passwd: params.passwd,
        };
        loginFetch(loginInput);
      }
    };

    const userInfoFetchData = (userid: string) => {
      userInfoInput.Input1 = {
        ...userInfoInput.Input1,
        hts_id: userid,
      };

      userInfoFetch();
    };

    const userDetailInfoFetchData = () => {
      userDetailInfoInput.Input1 = {
        ...userDetailInfoInput.Input1,
        szCustNo: loginInput.Input1.userid,
        szPasswd: loginInput.Input1.passwd,
      };

      userDetailInfoFetch(userDetailInfoInput);
    }

    useEffect(() => {
      if (loginRes) {
        if (loginRes.Message.flag === 'E') {
          alert(loginRes.Message.data);
        } else {
          const userid = loginRes.Output1.userid;
          userInfoFetchData(userid);
          userDetailInfoFetchData();
        }
      }
    }, [loginRes]);

    useEffect(() => {
      if (userInfoRes && userDetailInfoRes && userInfoRes.Output2 && userDetailInfoRes.Output1) {
        this.#dispatch(
          setAuth({
            email: userInfoRes.Output2[0][1],
            szAccNo: userInfoRes.Output2[0][2],
            szPasswd: userInfoRes.Output2[0][3],
            szBankAccNo: userDetailInfoRes.Output1.szBank_AccNo
          })
        );
        navigate(-1);
      }
    }, [userInfoRes, userDetailInfoRes]);

    return { loginRes, loginFetchData };
  }

  register() {
    const input: TransactionInputType = {
      Header: { function: 'D', termtype: 'HTS', trcode: 't113B' },
      Input1: {},
    };

    const { resultKey: registerTrCode, fetchData } = useAsyncData(input);
    const registerRes = useTypedSelector(
      (state) => state.asyncData[registerTrCode]
    );

    const registerFetchData = (
      params: RegisterInput | undefined = undefined
    ) => {
      if (params) input.Input1 = params;
      else return;
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

  getUserMarginData(): {
    marginData: UserMarginData;
    getMarginData: () => void;
  } {
    const { szAccNo, email } = useUserData();
    const data = useTypedSelector((state) => state.asyncData[`t3608`]);

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't3608',
        userid: email,
      },
      Input1: {
        szAccNo: szAccNo,
      },
    };

    const { fetchData } = useAsyncData(input);

    const getMarginData = () => {
      fetchData({ ...input });
    };

    useEffect(() => {
      getMarginData();
    }, [szAccNo]);

    const parseData =
      data && data.Output2
        ? data.Output2[0].map((d) => formatNumber(d, 2))
        : [];

    return {
      marginData: {
        balance: (parseData[0] ?? 0).toString(), // Balance ???????????????
        openPositionMargin: (parseData[1] ?? 0).toString(), // Open Position Margin ???????????????
        grossPnL: (parseData[2] ?? 0).toString(), // Gross P&L ????????????
        possibleWithdraw: (parseData[3] ?? 0).toString(), // Valuation Equity ??????????????????
        maintenMargin: (parseData[4] ?? 0).toString(), // Required Order Margin ???????????????
        marginForUse: (parseData[5] ?? 0).toString(), // Maintenance Position Margin ???????????????
        availableMargin: (parseData[6] ?? 0).toString(), // Available Margin ??????????????????
        marginCallRate: (parseData[7] ?? 0).toString(), // Margin Call rate(%) ???????????????
      },
      getMarginData,
    };
  }

  logout() {
    this.#dispatch(resetAuth());
  }
}

export default UserService;
