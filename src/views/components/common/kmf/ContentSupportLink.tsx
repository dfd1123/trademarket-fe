import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContentSupportLink = () => {
  return <Container>1월 콘텐츠창작 지원사업</Container>;
};

export default ContentSupportLink;

const Container = styled.li`
  width: 100%;
  height: 4rem;
  text-decoration: none;
  padding: 6px 18px;
  display: flex;
  align-items: center;
  background-image: url('img/kmf/arrow.png');
  background-position: 95% center;
  background-size: 16px;
  background-repeat: no-repeat;
`;
