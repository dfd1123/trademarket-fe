import {useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import userService from '@/services/UserService';
import {RegisterInput} from '@/types/services/User';
import {BasicButton} from '@/views/components/common/Button';

function Test2() {
  const input: RegisterInput = {
    szCustNo: 'dfd1123@naver.com',
    szFamilyName: 'test',
    szMemberNo: '000',
    szNation_Name: '82',
    szPasswd: 'qwer1234',
    szPasswd1: 'qwer1234',
    szTelNo2: '01088857406',
    szUserName: ''
  };

  const {registerRes, registerFetchData} = userService.register(input);

  const [tsInp, setTsInp] = useState({
    email: '',
    name: ''
  });

  const handleChange = (target : string) => (e: { target: { value: any; }; }) => {
        setTsInp({
            ...tsInp,
            [target]: e.target?.value,
        });
    };

  const registerSubmit = () => {
    console.log('awdawdawda')
    registerFetchData();
  };

  return (
    <div>
      <h1>TEST2</h1>
      <div>
        <input type="text" value={tsInp.email} onChange={handleChange('email')} />
        <input type="text" value={tsInp.name}  onChange={handleChange('name')} />
      </div>
      <BasicButton>
        <Link to='/test1'>테스트1</Link>
      </BasicButton>
      <BasicButton onClick={registerSubmit}>회원가입 테스트</BasicButton>
    </div>
  );
}

export default Test2;
