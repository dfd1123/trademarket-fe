import styled from 'styled-components';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import TextInput from '@/views/components/common/input/TextInput';
import BasicButton from '@/views/components/common/Button';
import EmailLoginForm from '@/views/components/auth/EmailLoginForm';
import { useNavigate } from 'react-router';

const EmailLogin = () => {
    const navigate = useNavigate();

  return (
    <EmailLoginStyle>
      <KmfHeader headerText="아이디로 로그인" prev />
      <div className="login-cont">
        <EmailLoginForm />
        <div className="btn-holder">
          <BasicButton during={900} onClick={()=> navigate('/find/id')}>아이디/비밀번호를 잊으셨나요?</BasicButton>
          <BasicButton during={900} onClick={()=> navigate('/register')}>회원이 아니신가요?</BasicButton>
        </div>
      </div>
    </EmailLoginStyle>
  );
};

const EmailLoginStyle = styled.div`
  .login-cont {
    padding: 16px;

    ${TextInput} {
      width: 100%;
      margin-bottom: 13px;
    }

    .btn-holder {
      ${BasicButton} {
        display: block !important;
        margin-bottom: 16px;
        border: 1px solid #d2d2d2;

        > button {
          height: 45px;
          font-size: 12px;
          line-height: 14px;
          color: #4f4f4f;
          text-decoration: underline;
          text-decoration-color: #a8a7a7;
        }
      }
    }
  }
`;

export default EmailLogin;
