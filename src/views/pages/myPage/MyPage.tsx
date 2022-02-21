import useModal from '@/hooks/useModal';
import { BasicButton } from '@/views/components/common/Button';
import { Switch } from '@/views/components/common/kmf/Switch';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import KmfModal from './KmfModal';

const MyPage = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();

  const openTestModal = async (
    title: string,
    content: string,
    subTitle: string,
    subContent: string,
    isConfirm: boolean
  ) => {
    const result = await openModal(KmfModal, {
      props: {
        title: title,
        content: content,
        subTitle: subTitle,
        subContent: subContent,
        isConfirm: isConfirm,
      },
    });

    console.log(result);
  };

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
          onClick={() =>
            openTestModal(
              '로그아웃 확인',
              'KMF Members에서 로그아웃 하시겠어요?',
              '',
              '',
              true
            )
          }>
          로그아웃
        </ModalButton>
        <ModalButton
          onClick={() =>
            openTestModal(
              '회원탈퇴안내',
              '회원탈퇴는 사무국으로 문의해주세요.',
              'KMF 사무국 연락처',
              '02-999-9999',
              false
            )
          }>
          회원탈퇴
        </ModalButton>
        <ModalButton
          onClick={() =>
            openTestModal(
              '앱버전',
              '현재 앱의 버전은 v.1.0.0 입니다.',
              '',
              '',
              false
            )
          }>
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
