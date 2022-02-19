import styled from 'styled-components';
import FindIdForm from '@/views/components/auth/FindIdForm';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import FooterButton from '@/views/components/common/FooterButton';
import { useNavigate } from 'react-router';

const FindId = () => {
const navigate = useNavigate();
  return (
    <FindIdStyle>
      <KmfHeader headerText="아이디/비밀번호 찾기" prev />
      <span className="sub-info">
        회원가입시 등록하셨던 기본정보를 확인합니다.
      </span>
      <div className="find-cont">
        <FindIdForm />
      </div>
      <FooterButton onClick={() => navigate('/login')}>로그인</FooterButton>
    </FindIdStyle>
  );
};

const FindIdStyle = styled.div`
  .sub-info {
    display: block;
    margin: 16px;
    margin-left: 19px;
    margin-bottom:0;
    font-size: 12px;
    line-height: 17px;
    color: #828282;
  }

  .find-cont {
    padding: 16px;
  }
`;

export default FindId;
