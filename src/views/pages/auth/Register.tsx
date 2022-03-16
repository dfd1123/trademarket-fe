import styled from 'styled-components';
import RegisterForm from '@/views/components/auth/RegisterForm';
import useTranslate from '@/hooks/useTranslate';

const Register = () => {
    const {t} = useTranslate('auth.register');

    return (
        <RegisterStyle>
            <div className="register-cont">
                <h1 className="tit">{t('_.title')}</h1>
                <RegisterForm />
            </div>
        </RegisterStyle>
    );
}

const RegisterStyle = styled.div`
    .register-cont{
        padding:24px 16px;

        .tit{
            font-size: 24px;
            color:#353535;
            font-weight: 500;
            letter-spacing: -1px;
            line-height:35px;
        }
        .sub-info{
            margin:42px 0 35px;
            font-size: 12px;
            color:#828282;
            font-weight: 400;
            letter-spacing: -1px;
            line-height:17px;
        }
    }
`;

export default Register;