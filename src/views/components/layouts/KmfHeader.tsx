import React from 'react';
import styled from 'styled-components';
import { BasicButton } from '@/views/components/common/Button'

interface HeaderProps {
  headerText: string;
  prevLink?: string;
  prevImgUrl?: string;
  nextLink?: string;
  nextImgUrl?: string;
}

const Header = ({ headerText, prevLink, prevImgUrl, nextLink, nextImgUrl }: HeaderProps) => {
  return (
    <div>
      <HeaderComponent>
        {headerText}
      </HeaderComponent>
      {
        (prevLink && prevImgUrl) && (
          <ButtonStyle position="left">
            <ButtonWrapper><img src={prevImgUrl}/></ButtonWrapper>
          </ButtonStyle>
        )
      }
      {
        (nextLink && nextImgUrl) && (
          <ButtonStyle position="right">
            <ButtonWrapper><img src={nextImgUrl}/></ButtonWrapper>
          </ButtonStyle>
        )
      }
      
    </div>
  );
};

export default Header;

const HeaderComponent = styled.div`
  text-align: center;
  height: 46px;
  width: 100%;
  font-size: 21px;
  background-color: #1574bd;
  color: white;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonStyle = styled.div<{position: string}>`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 8px;
  left: ${props => props.position === 'left' ? '8px' : ''};
  right: ${props => props.position === 'right' ? '8px' : ''};
`;

const ButtonWrapper = styled(BasicButton)`
  width: 30px;
  height: 30px;
  border: 0;
  background-color: transparent;
  padding: 0;

  button {
    width: 100%;
    height: 100%;
  }
  
  img {
    width: 24px;
    height: 24px;
  }
`;
