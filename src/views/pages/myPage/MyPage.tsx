import React from 'react';
import styled from 'styled-components';
import KmfFooter from '@/views/components/layouts/KmfFooter';
import KmfHeader from '@/views/components/layouts/KmfHeader';
import KmfListWrapper from '@/views/components/common/listView/KmfListWrapper';
import KmfLinkedList from '@/views/components/common/listView/KmfLinkedList';
import { dateFormat } from '@/utils/dateUtils';

const MyPage = () => {
  return (
    <ContainerStyle>
      <KmfHeader headerText="마이페이지" />
      <PushSettingStyle>sdf</PushSettingStyle>
      <ListWrapperStyle>
        <KmfListWrapper>
          <KmfLinkedList title="프로필 관리" to="/info" />
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
`;

const ListWrapperStyle = styled.ul`
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > li {
    margin: 0 16px;
    border-bottom: 1px solid #f1f1f1;
  }
`;

export default MyPage;
