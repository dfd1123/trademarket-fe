import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
  headerText: string;
}

const Header = ({ headerText }: HeaderProps) => {
  return (
    <>
      <HeaderComponent>{headerText}</HeaderComponent>
    </>
  );
};

export default Header;

const HeaderComponent = styled.header`
  text-align: center;
  height: 10%;
  width: 100%;
  font-size: 2rem;
  background-color: #1574bd;
  color: white;
  padding: 20px 0;
`;
