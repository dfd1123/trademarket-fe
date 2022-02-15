import React from 'react';
import styled from 'styled-components';
import {
  KmfHeader,
  KmfFooter,
  KmfListWrapper,
  KmfLinkedList,
} from '@/views/components/common/kmf';
import { dateFormat } from '@/utils/dateUtils';

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
              date={dateFormat(new Date(), 'yyyy - MM - dd')}
            />
          }
        />
        <KmfListWrapper
          imgUrl="img/kmf/download.png"
          children={
            <KmfLinkedList
              title="Incididunt nulla non veniam proident Lorem consequat pariatur. Non ut culpa cillum ullamco cillum do officia aute aliqua proident laboris irure consequat. Sint mollit dolore cillum fugiat elit reprehenderit deserunt dolor culpa duis eu aliqua. Eu est dolore est cupidatat amet. Deserunt sit ullamco dolore reprehenderit deserunt sint laboris sit. Est non magna non pariatur sit aute minim pariatur consequat veniam qui et ad. Ea ea elit voluptate veniam cupidatat est minim duis elit velit deserunt cillum.

Ex aute ex exercitation anim. Tempor pariatur esse fugiat adipisicing sint ad eu magna quis cillum sint enim irure. Dolor adipisicing et velit dolor tempor Lorem mollit amet culpa ad. Ullamco eu dolor ullamco proident aute ad. Dolore labore mollit laboris Lorem aute sint duis."
              to="/info"
              date={dateFormat(new Date(), 'yyyy - MM - dd')}
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

  & > li {
    margin: 0 16px;
    border-bottom: 1px solid #f1f1f1;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Footer = styled(KmfFooter)`
  margin-top: auto;
`;
