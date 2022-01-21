import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import socketService from '@/modules/SocketService';


function Test2() {
  const registerSubmit = async () => {
    const params = {
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

    // @ts-ignore
    const res = await socketService.asyncSend(params);
    console.log(res);
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
