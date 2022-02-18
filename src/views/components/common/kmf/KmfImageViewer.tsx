import React from 'react';
import styled from 'styled-components';

interface PropsType {
  imgUrl: string;
  children?: React.ReactNode;
  width?: string;
  height?: string;
}

const KmfImageViewer = ({imgUrl, children, width, height}: PropsType) => {
  return (
    <ImageContainer width={width} height={height}>
      <img src={imgUrl} />
      {children}
    </ImageContainer>
  )
}

const ImageContainer = styled.div<{width: string, height: string}>`
  width: ${props => props.width ? props.width : '100px'};
  height: ${props => props.height ? props.height : '100px'};
  position: relative;

  img {
    width: 100%;
    height: 262px;
    object-fit: cover;
  }
`;

export default KmfImageViewer;