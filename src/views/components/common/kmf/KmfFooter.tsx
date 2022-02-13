import React from 'react';
import styled from 'styled-components';

const KmfFooter = () => {
  return (
    <Container>
      <LinkButton>공지사항</LinkButton>
      <LinkButton>사업안내</LinkButton>
      <LinkButton>회원검색</LinkButton>
      <LinkButton>자료실</LinkButton>
      <LinkButton>마이페이지</LinkButton>
    </Container>
  );
};

export default KmfFooter;

const Container = styled.footer`
  width: 100%;
  height: 84px;
  border-top: 1px solid #cacaca;
  display: flex;
  justify-content: space-evenly;
  font-size: 0.8rem;
  background-color: #f0f0f0;
  padding-top: 14px;
`;

const LinkButton = styled.div`
  height: 100%;
`;
