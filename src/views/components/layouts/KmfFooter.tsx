import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const KmfFooter = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LinkButton onClick={() => navigate('/')}>공지사항</LinkButton>
      <LinkButton onClick={() => navigate('/info')}>사업안내</LinkButton>
      <LinkButton onClick={() => navigate('/')}>회원검색</LinkButton>
      <LinkButton onClick={() => navigate('/ref')}>자료실</LinkButton>
      <LinkButton onClick={() => navigate('/mypage')}>마이페이지</LinkButton>
    </Container>
  );
};

export default KmfFooter;

const Container = styled.footer`
  margin-top: auto;
  width: 100%;
  min-height: 64px;
  border-top: 1px solid #cacaca;
  display: flex;
  justify-content: space-evenly;
  font-size: 10px;
  background-color: #f0f0f0;
  padding-top: 14px;
  & > :not(:last-child) {
    border-right: 1px solid #cecece;
  }
`;

const LinkButton = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
