import React, {useContext} from 'react';
import {Link, Outlet} from 'react-router-dom';
import { WebSocketContext } from '@/provider/WebSocketProvider';
import { TransactionInputType } from '@/types/TransactionType';


function Test2() {
  const ws = useContext(WebSocketContext);

  const registerSubmit = async () => {
    const params : TransactionInputType = {
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

     ws.sendInput(params);
  }
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
