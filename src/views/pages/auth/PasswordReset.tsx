import styled from 'styled-components';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import PasswordResetForm from '@/views/components/auth/PasswordResetForm';

const PasswordReset = () => {
  return (
    <PasswordResetStyle>
      <KmfHeader headerText="비밀번호 재설정" />
      <div className="reset-cont">
        <PasswordResetForm />
      </div>
    </PasswordResetStyle>
  );
};

const PasswordResetStyle = styled.div`
  .reset-cont {
    padding: 16px;
  }
`;

export default PasswordReset;
