import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ContentSupportLinkProps {
  children: React.ReactNode;
  imgUrl: string;
}

const KmfListWrapper = ({ children, imgUrl}: ContentSupportLinkProps) => {
  return (
    <>
      <Container imgUrl={imgUrl}>{children}</Container>
    </>
  );
};

export default KmfListWrapper;

const Container = styled.li<{ imgUrl?: string }>`
  width: 100%;
  text-decoration: none;
  font-size: 14px;
  padding: 6px 18px;
  display: flex;
  flex-direction: column;
  background-image: url(${props => props.imgUrl ? props.imgUrl : 'img/kmf/arrow.png'});
  background-position: 95% center;
  background-size: 16px;
  background-repeat: no-repeat;
`;
