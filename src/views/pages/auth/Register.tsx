import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import useUserData from '@/hooks/useUserData';
import useTranslate from '@/hooks/useTranslate';
import RegisterForm from '@/views/components/auth/RegisterForm';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

const Register = () => {
  const { t } = useTranslate('auth.register');
  const navigate = useNavigate();
  const { isLoggedIn } = useUserData();

  useEffect(() => {
    if(isLoggedIn){
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <RegisterStyle>
      <div className="register-cont">
        <h1 className="tit">{t('_.title')}</h1>
        <div className="holder">
          <RegisterForm />
        </div>
      </div>
    </RegisterStyle>
  );
};

const RegisterStyle = styled.div`
  .register-cont {
    max-width: 700px;
    min-height: calc(100vh - 74px);
    margin: 0 auto;
    padding: 24px 16px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .tit {
      margin-bottom: 40px;
      font-size: 32px;
      color: #353535;
      font-weight: 700;
      letter-spacing: -1px;
      line-height: 46px;
      text-align: center;
    }

    .holder{
        padding: 50px 10px;
        border: 1px solid rgb(208, 208, 208);
        border-radius: 4px;

        >div{
            max-width: 380px;
            margin: 0 auto;
            padding-bottom: 0;
        }
    }
    .sub-info {
      margin: 42px 0 35px;
      font-size: 12px;
      color: #828282;
      font-weight: 400;
      letter-spacing: -1px;
      line-height: 17px;
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    .register-cont {
        min-height: calc(100vh - 43px);
        .tit{
            font-size: 25px;
            line-height: 30px;
        }
    }
  }
`;

export default Register;
