import {useEffect} from 'react';
import {Link, Outlet} from 'react-router-dom';
import useAsyncData from '@/hooks/useAsyncData';
import { WebSocketContext } from '@/provider/WebSocketProvider';
import { TransactionInputType } from '@/types/TransactionType';
import { useTypedSelector } from '@/store';


function Test2() {
  const input : TransactionInputType = {
    Header: { function: 'D', termtype: 'HTS', trcode: 't113B' },
    Input1: {
      szCustNo: "dfd1123@naver.com",
      szFamilyName: "test",
      szMemberNo: "000",
      szNation_Name: "82",
      szPasswd: "qwer1234",
      szPasswd1: "qwer1234",
      szTelNo2: "01088857406",
      szUserName: ""
    },
  };

  const {resultKey: registerTrCode, fetchData: registerFetchData} = useAsyncData(input);
  const registerRes = useTypedSelector(state => state.asyncData[registerTrCode]);

  useEffect(() => {
      if(registerRes){
        if(registerRes.Message.flag === 'E'){
          alert(registerRes.Message.data);
        }
      }
  }, [registerRes]);

  const registerSubmit = async () => {
    registerFetchData();
  };

  return (
    <div>
      <h1>TEST2</h1>
      <button>
        <Link to='/test1'>테스트1</Link>
      </button>
      <button onClick={registerSubmit}>회원가입 테스트</button>
    </div>
  );
}

export default Test2;
