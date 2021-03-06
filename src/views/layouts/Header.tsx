import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { DefaultTheme } from 'styled-components';
import darkLogo from '@/assets/img/logo/imcosun-logo.svg';
import PcGnb from '@/views/layouts/PcGnb';
import { YellowButton } from '@/views/components/common/Button';
import MobileGnb from '@/views/layouts/MobileGnb';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import useModal from '@/hooks/useModal';
import useRouteMeta from '@/hooks/useRouteMeta';
import { useTypedSelector } from '@/store';
import UserInfo from '@/views/layouts//UserInfo';

const Header = React.memo(function Header({ theme }: { theme: DefaultTheme }) {
  const logoText = true;
  const logoImage = theme.name === 'dark' ? darkLogo : darkLogo; // TODO:: whiteLogo 만들기
  const headerHide = useRouteMeta('headerHide');
  const navigate = useNavigate();
  const { openModal } = useModal();
  const userInfo = useTypedSelector((state) => state.authSlice);

  const mobileMenuOpen = () => {
    openModal(MobileGnb);
  };

  return headerHide ? (
    <></>
  ) : (
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
        {userInfo.isLoggedIn ? (
          <UserInfo info={userInfo} />
        ) : (
          <YellowButton
            className="btn-login"
            onClick={() => navigate('/login')}
          >
            Login
          </YellowButton>
        )}

        <button className="btn-mobile-menu" onClick={mobileMenuOpen}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="2" fill="#FFFFFF"></rect>
            <rect x="3" y="11" width="18" height="2" fill="#FFFFFF"></rect>
            <rect x="3" y="17" width="12" height="2" fill="#FFFFFF"></rect>
          </svg>
        </button>
      </div>
    </StyleHeader>
  );
});

const StyleHeader = styled.header`
  position: relative;
  z-index: 11;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
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
      font-size: 30px;
      font-weight: 600;
      color: ${(props) => props.theme.header.color};
      ${(props) =>
        props.theme.name !== 'light'
          ? 'text-shadow: 0 0 5px rgba(0, 0, 0, 0.7)'
          : ''};
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  .btn-cont {
    position: absolute;
    right: 20px;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100%;
    .btn-login {
      > button {
        width: 120px;
        height: 32px;
        font-weight: 700;
      }
    }
    .btn-mobile-menu {
      display: none;
      svg {
        vertical-align: middle;
        rect {
          ${(props) =>
            props.theme.name !== 'light' ? 'fill: #f1f1f1;' : 'fill: #000;'};
        }
      }
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    height: 43px;
    margin: 0 20px;
    padding: 0;

    .logo {
      justify-content: left;
      width: 100px;
      span {
        font-size: 27px;
      }
    }

    .btn-cont {
      right:0;
      .btn-login {
        display: none !important;
      }
      .btn-mobile-menu {
        display: inline-block;
      }
    }
  }
`;

export default Header;
