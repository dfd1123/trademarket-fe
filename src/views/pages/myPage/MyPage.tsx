import React from 'react';
import styled from 'styled-components';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import { dateFormat } from '@/utils/dateUtils';
import { styled as MuiStyled } from '@mui/material/styles';
import useModal from '@/hooks/useModal';
import KmfModal from './KmfModal';
import { BasicButton } from '@/views/components/common/Button';
import { Switch } from '@/views/components/common/kmf/Switch';

const MyPage = () => {
  const { openModal } = useModal();

  const openTestModal = async () => {
    const result = await openModal(KmfModal, {
      props: {
        title: 'sdas',
        content: 'dadfasfasfas',
        subTitle: 'ssss',
        subContent: 'asdfasdfasfasf',
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
        <ModalButton onClick={openTestModal}>프로필 관리</ModalButton>
        {/* link */}
        <ModalButton onClick={openTestModal}>비밀번호 변경</ModalButton>
        {/* link */}
        <ModalButton onClick={openTestModal}>서비스 이용약관</ModalButton>
        {/* link */}
        <ModalButton onClick={openTestModal}>
          개인정보 수집 및 활용지칩
        </ModalButton>
        <ModalButton onClick={openTestModal}>로그아웃</ModalButton>
        <ModalButton onClick={openTestModal}>회원탈퇴</ModalButton>
        <ModalButton onClick={openTestModal}>앱버전</ModalButton>
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
