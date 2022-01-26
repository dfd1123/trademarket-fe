import React from "react";
import { Link } from "react-router-dom";
import styled, { DefaultTheme } from "styled-components";
import darkLogo from "@/assets/img/logo/imcosun-logo.svg";
import PcGnb from "@/views/components/layouts/PcGnb";
import {YellowButton} from "@/views/components/common/Button";

function Header({ theme }: { theme: DefaultTheme }) {
  const logoText = true;
  const logoImage = theme.name === "dark" ? darkLogo : darkLogo; // TODO:: whiteLogo 만들기

  return (
    <StyleHeader theme={theme}>
      <div className="logo">
        <Link to="/">
          {!logoText && logoImage ? (
            <img src={logoImage} alt="logo" />
          ) : (
            <span>LOGO</span>
          )}
        </Link>
      </div>
      <PcGnb theme={theme} />
      <div className="btn-cont">
        <YellowButton className="btn-login">Login</YellowButton>
      </div>
    </StyleHeader>
  );
}

const StyleHeader = styled.header`
  position: relative;
  margin: 0 20px;
  .logo {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 146px;
    height: 100%;
    text-align: center;

    span {
      font-size: 40px;
      color: ${props => props.theme.header.color};
      ${props => props.theme.name === 'dark' ? 'text-shadow: 0 0 5px rgba(0, 0, 0, 0.7)' : ''};
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  .btn-cont{
    position: absolute;
    right:0;
    top:0;
    z-index: 1;
    display: flex;
    align-items: center;
    height:100%;
    .btn-login{
      width:120px;
      height:32px;
      font-weight:700;
    }
  }
`;

export default Header;
