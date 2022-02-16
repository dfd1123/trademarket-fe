import React from 'react';
import styled from 'styled-components';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import KmfListWrapper from '@/views/components/common/listView/KmfListWrapper';
import KmfLinkedList from '@/views/components/common/listView/KmfLinkedList';
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
    const result = await openModal(KmfModal);

    console.log(result);
  }

  return (
    <ContainerStyle>
      <KmfHeader headerText="마이페이지" />
      <PushSettingStyle>
        <PushTextStyle>알림설정</PushTextStyle>
      <SwitchStyle
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        label=""
      />
      </PushSettingStyle>
      <BasicButton onClick={openTestModal} >modal test</BasicButton>
      <ListWrapperStyle>
        <KmfListWrapper>
          <KmfLinkedList title="프로필 관리" to="/info" fontColor='#353535'  />
        </KmfListWrapper>
        <KmfListWrapper>
          <KmfLinkedList title="비밀번호 변경" to="/info" fontColor='#353535' />
        </KmfListWrapper>
        <KmfListWrapper>
          <KmfLinkedList title="서비스 이용약관" to="/info" fontColor='#353535' />
        </KmfListWrapper>
        <KmfListWrapper>
          <KmfLinkedList title="개인정보 수집 및 활용지침" to="/info" fontColor='#353535' />
        </KmfListWrapper>
        <KmfListWrapper>
          <KmfLinkedList title="로그아웃" to="/info" fontColor='#353535' />
        </KmfListWrapper>
        <KmfListWrapper>
          <KmfLinkedList title="회원탈퇴" to="/info" fontColor='#353535' />
        </KmfListWrapper>
        <KmfListWrapper>
          <KmfLinkedList title="앱버전" to="/info" fontColor='#353535' />
        </KmfListWrapper>
      </ListWrapperStyle>
      <FooterStyle />
    </ContainerStyle>
  );
};

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

const ListWrapperStyle = styled.ul`
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > li {
    margin: 0 16px;
    border-bottom: 1px solid #f1f1f1;
    height: 80px;
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
