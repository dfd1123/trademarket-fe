import styled from 'styled-components';
import useDialog from '@/hooks/useDialog';
import useService from '@/hooks/useService';
import { BasicButton } from '@/views/components/common/Button';
import { Switch } from '@/views/components/common/kmf/Switch';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import OfficeNumber from '@/views/components/mypage/OfficeNumber';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const { alert, confirm } = useDialog();
  const services = useService();

  const logout = async () => {
    const result = await confirm('KMF Members에서 로그아웃 하시겠어요?', {title: '로그아웃 확인'});

    if(result) {
      await services.user.logout();
      services.cookie.removeAccessToken();
      navigate('/login');
    }
  }

  const secession = async () => {
    const result = await alert('회원탈퇴는 사무국으로 문의해주세요.', {title: '회원탈퇴안내', children: OfficeNumber});

    if(result) {

    } else {

    }
  }

  return (
    <ContainerStyle>
      <KmfHeader headerText="마이페이지" prev />
      <PushSettingStyle>
        <PushTextStyle>알림설정</PushTextStyle>
        <Switch />
      </PushSettingStyle>
      <ListWrapperStyle>
        {/* link */}
        <ModalButton onClick={() => navigate('/manageProfile')}>
          프로필 관리
        </ModalButton>
        {/* link */}
        <ModalButton onClick={() => navigate('/passwordChange')}>
          비밀번호 변경
        </ModalButton>
        {/* link */}
        <ModalButton onClick={() => navigate('/serviceInfo')}>
          서비스 이용약관
        </ModalButton>
        {/* link */}
        <ModalButton onClick={() => navigate('/term')}>개인정보 수집 및 활용지칩</ModalButton>
        <ModalButton
          onClick={logout}>
          로그아웃
        </ModalButton>
        <ModalButton
          onClick={secession}>
          회원탈퇴
        </ModalButton>
        <ModalButton
          onClick={() => alert('현재 앱의 버전은 v.1.0.0 입니다.', {title: '앱버전'})}>
          앱버전
        </ModalButton>
      </ListWrapperStyle>
      <FooterStyle />
    </ContainerStyle>
  );
};

const ListWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  & div:first-child {
    border-top: 1px solid #f1f1f1;
  }

  & button {
    font-size: 14px;
    color: #353535;
  }
`;

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const FooterStyle = styled(KmfFooter)`
  margin-top: auto;
`;

const PushSettingStyle = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalButton = styled(BasicButton)`
  width: 100%;
  height: 82px;
  border: 0;
  border-bottom: 1px solid #f1f1f1;
  padding: 0;

  button {
    width: 100%;
    height: 100%;
    text-align: left;
  }
`;

const PushTextStyle = styled.div`
  color: #353535;
  font-size: 14px;
`;

export default MyPage;
