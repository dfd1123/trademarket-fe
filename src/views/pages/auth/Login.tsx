import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import loginBg from '@/assets/img/kmf/bg/login-bg.png';
import icoEmail from '@/assets/img/kmf/ico/ico-email.svg';
import icoKakao from '@/assets/img/kmf/ico/ico-kakao.svg';
import icoGoogle from '@/assets/img/kmf/ico/ico-google.svg';
import { BasicButton } from '@/views/components/common/Button';

const Login = () => {
  const navigate = useNavigate();

  const socialLogin = (social : string) => {
    location.href = `${process.env.VITE_API_URL}/${social}`;
  }

  return (
    <LoginContainerStyle>
      <div className="main-tit">
        <h3>The KMF</h3>
        <h1>MEMBERS</h1>
      </div>
      <div className="login-btn-holder">
        <div>
          <span className="label">SNS로 시작</span>
          <BasicButton className="btn-kakao" during={1000} onClick={() => socialLogin('kakao')}>
            카카오로 시작하기
          </BasicButton>
          <BasicButton className="btn-google" during={1000} onClick={() => socialLogin('google')}>
            구글로 시작하기
          </BasicButton>
          <BasicButton className="btn-email" during={1000} onClick={() => navigate('/emailLogin')}>
            아이디로 시작하기
          </BasicButton>
          <p className="sub-info">
            The KMF Members는 협회원들의 원활한 정보공유를 돕기 위해 제작된
            회원전용 서비스이며, 가입시 사무국의 승인이 필요합니다.
          </p>
        </div>
      </div>
    </LoginContainerStyle>
  );
}

const LoginContainerStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-height: 520px;
  overflow-y: scroll;
  text-align: center;
  background-image: url(${loginBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .main-tit {
    margin-top: 22vh;
    text-align: center;
    color: #fff;

    > h3 {
      font-size: 30px;
      font-weight: 700;
      line-height: 35px;
      letter-spacing: -0.01em;
    }

    > h1 {
      margin-top: 8px;
      font-size: 51px;
      font-weight: 700;
      line-height: 60px;
      letter-spacing: -0.01em;
    }
  }

  .login-btn-holder {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    padding: 0 25px 63px;

    >div{
      max-width: 620px;
    margin: 0 auto;
    }

    .label {
      position: relative;
      display: block;
      width: 166px;
      margin: 0 auto;
      text-align: center;
      font-size: 10px;
      font-weight: 700;
      color: #fff;
      line-height: 14.5px;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 6px;
        left: 0;
        z-index: 1;
        display: inline-block;
        width: 50px;
        height: 1px;
        background-color: #fff;
      }

      &::after {
        left: auto;
        right: 0;
      }
    }

    ${BasicButton} {
      display: block !important;
      margin: 16px 0;
      border: 0px solid transparent;

      > button {
        width: 100%;
        height: 45px;
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        border-radius: 5px;
        background-color: #fff;
        background-position: 18px center;
        background-repeat: no-repeat;
        background-size: 24px;
      }

      &.btn- {
        &kakao {
          button {
            background-image: url(${icoKakao});
            background-color: #fee500;
          }
        }

        &google {
          button {
            background-image: url(${icoGoogle});
          }
        }

        &email {
          button {
            background-image: url(${icoEmail});
          }
        }
      }
    }

    .sub-info {
      font-size: 12px;
      line-height: 17px;
      color: #fff;
    }
  }
`;

export default Login;
