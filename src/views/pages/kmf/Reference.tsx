import React from 'react';
import styled from 'styled-components';
import {
  KmfHeader,
  KmfFooter,
  KmfListWrapper,
  KmfLinkedList,
} from '@/views/components/common/kmf';

const Reference = () => {
  return (
    <Container>
      <KmfHeader headerText="자료실" />
      <TotalField>총 5건</TotalField>
      <ListWrapper>
        <KmfListWrapper
          imgUrl="img/kmf/download.png"
          children={
            <KmfLinkedList
              title="2월 콘텐츠창작 지원사업"
              to="/info"
              date={new Date().toDateString()}
            />
          }
        />
      </ListWrapper>
      <Footer />
    </Container>
  );
};

export default Reference;

const TotalField = styled.div`
  width: 100%;
  height: 3rem;
`;

const ListWrapper = styled.ul`
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Footer = styled(KmfFooter)`
  margin-top: auto;
`;
