import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useService from '@/hooks/useService';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import { YellowButton } from '@/views/components/common/Button';
import MerterialInput from '@/views/components/common/input/TextInput';
import useUserData from '@/hooks/useUserData';

const initialInputs = {
  userid: '',
  passwd: '',
  otp_token: '',
};

const Login = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const navigate = useNavigate();
  const services = useService();
  const { isLoggedIn } = useUserData();
  const { loginFetchData } = services.user.login(inputs);

  const handleInputChange = (value: any, name: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const loginSubmit = () => {
    loginFetchData(inputs);
  };

  useEffect(() => {
    if(isLoggedIn){
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <LoginStyle>
      <div className="cont">
        <h1 className="tit">Login</h1>
        <div className="login-form">
          <div className="holder">
            <MerterialInput
              label="Email"
              type="email"
              name="userid"
              onChange={handleInputChange}
            />
            <MerterialInput
              label="Password"
              type="password"
              name="passwd"
              onChange={handleInputChange}
              onEnter={loginSubmit}
            />
            <YellowButton onClick={loginSubmit}>Login</YellowButton>
          </div>
        </div>
        <div className="btn-con">
          <YellowButton onClick={() => navigate('/register')}>
            Register
          </YellowButton>
        </div>
      </div>
    </LoginStyle>
  );
};

const LoginStyle = styled.div`
  .cont {
    max-width: 700px;
    min-height: calc(100vh - 74px);
    margin: 0 auto;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .tit {
      font-weight: 700;
      font-size: 32px;
      line-height: 46px;
      text-align: center;
      color: rgb(50, 50, 50);
      margin-bottom: 40px;
    }

    .login-form {
      width: 100%;
      margin: 0 auto 15px;
      padding: 20px 10px;
      border: 1px solid rgb(208, 208, 208);
      box-sizing: border-box;
      border-radius: 4px;
      .holder {
        max-width: 380px;
        margin: 0 auto;

        ${MerterialInput} {
          width: 100%;
          height: 49px;
          margin-bottom: 15px;

          .inp-cont {
          }

          label {
            font-size: 12px;
          }

          input {
            font-size: 14px;
            padding: 0 15px;
          }

          &.focus-value {
            label {
              top: -9px;
              /* left: 0; */
              background-color: #fff;
            }
          }
        }
      }
    }

    .btn-con {
      max-width: 400px;
      width: 100%;
      margin: 0 auto;
      padding: 0 10px;
    }

    ${YellowButton} {
      max-width: 380px;
      width: 100%;
      height: 48px;
      margin: 0 auto;
      font-size: 15px;
      font-weight: 700;
      border-radius: 4px;
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    .cont {
      min-height: calc(100vh - 43px);
    }
  }
`;

export default Login;
