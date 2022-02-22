import React from 'react';
import styled from 'styled-components';
import arrowImg from '@/assets/img/kmf/arrow.png';

interface PropsType {
  imgUrl?: string;
  children: React.ReactNode;
  className?:string;
}

const KmfListWrapper = ({children, className, imgUrl = arrowImg}: PropsType) => {
  return (
      <ContainerStyle className={className} imgUrl={imgUrl}>{children}</ContainerStyle>
  );
};

export default KmfListWrapper;

const ContainerStyle = styled.div<{ imgUrl?: string }>`
  width: 100%;
  text-decoration: none;
  font-size: 14px;
  padding: 6px 0;
  display: flex;
  flex-direction: column;
  background-image: url(${props => props.imgUrl ? props.imgUrl : 'img/kmf/arrow.png'});
  background-position: 95% center;
  background-size: 16px;
  background-repeat: no-repeat;
`;
