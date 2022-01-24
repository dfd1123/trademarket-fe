import { useEffect } from 'react';
import { useTypedSelector } from '@/store';
import useAsyncData from '@/hooks/useAsyncData';
import { TransactionInputType } from '@/types/TransactionType';
import { RegisterInput } from '@/types/services/User';

class UserService {
  register(params : RegisterInput) {
    const input : TransactionInputType = {
      Header: { function: 'D', termtype: 'HTS', trcode: 't113B' },
      Input1: params,
    };

    const {resultKey: registerTrCode, fetchData} = useAsyncData(input);
    const registerRes = useTypedSelector(state => state.asyncData[registerTrCode]);

    const registerFetchData = (params : RegisterInput) => {
      fetchData(params);
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
