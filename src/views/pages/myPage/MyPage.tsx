import React from 'react';
import styled from 'styled-components';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
// import KmfListWrapper from '@/views/components/common/listView/KmfListWrapper';
// import KmfLinkedList from '@/views/components/common/listView/KmfLinkedList';
import { dateFormat } from '@/utils/dateUtils';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled as MuiStyled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import useModal from '@/hooks/useModal';
import KmfModal from './KmfModal';
import {BasicButton} from '@/views/components/common/Button';

const MyPage = () => {
  const {openModal} = useModal();

  const openTestModal = async() => {
    const result = await openModal(KmfModal,{props: {title: 'sdas', content: 'dadfasfasfas', subTitle: 'ssss', subContent: 'asdfasdfasfasf'}});

    console.log(result);
  }

  return (
    <ContainerStyle>
      <KmfHeader headerText="마이페이지" prev />
      <PushSettingStyle>
        <PushTextStyle>알림설정</PushTextStyle>
        <SwitchStyle
          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
          label=""
        />
      </PushSettingStyle>
      <ListWrapperStyle>
          {/* link */}
          <ModalButton onClick={openTestModal}>프로필 관리</ModalButton>
          {/* link */}
          <ModalButton onClick={openTestModal}>비밀번호 변경</ModalButton>
          {/* link */}
          <ModalButton onClick={openTestModal}>서비스 이용약관</ModalButton>
          {/* link */}
          <ModalButton onClick={openTestModal}>개인정보 수집 및 활용지칩</ModalButton>
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
    border-top: 1px solid #F1F1F1;
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
  border-bottom: 1px solid #F1F1F1;
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

const SwitchStyle = styled(FormControlLabel)`
  margin-right: 0 !important;
`;

const IOSSwitch = MuiStyled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#1574BD',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#1574BD',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default MyPage;
