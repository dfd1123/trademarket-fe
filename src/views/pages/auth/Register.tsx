import styled from 'styled-components';
import RegisterForm from '@/views/components/auth/RegisterForm';

const Register = () => {
    return (
        <RegisterStyle>
            <div className="register-cont">
                <h1 className="tit">KMF 멤버스 가입신청</h1>
                <p className="sub-info">가입신청 후 협회승인시 서비스를 이용하실 수 있습니다. <br />협회에 등록하신 정보와 동일하게 작성해주세요.</p>
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