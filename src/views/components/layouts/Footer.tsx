import styled from 'styled-components';
import Logo from '@/assets/img/logo/footer-imcosun-logo.svg';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import useRouteMeta from '@/hooks/useRouteMeta';

const Footer = () => {
  const logoText = true;
  const logoImage = Logo;
  const footerHide = useRouteMeta('footerHide');

  return footerHide ? (<></>) : (
    <StyledFooter>
      <div className="ft-cont">
        <div className="logo">
          {!logoText && logoImage ? (
            <img src={logoImage} alt="logo" />
          ) : (
            <span>LOGO</span>
          )}
        </div>
        <p className="info">
          MATHEW GLOBAL SOFTWARE AND GAMING OPC
          <br />
          UG/F NO.30-31, Olypian City lll,1 Hoi Wang Road, W Kowloon Hwy, Tai
          Kok, Hong Kong
          <br />
          Company Registration Number: 2021010005083-00
          <br />
          Copyright (c) 2021 IMCOSUN. All Rights Reserved.
        </p>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background-color: rgb(1, 11, 21);

  .ft-cont {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 1200px;
    height: 300px;
    margin: 0 auto;
    padding: 70px 20px;

    .logo {
      > span {
        font-size: 40px;
        font-weight: 700;
        color: #fff;
      }
    }

    .info {
      font-size: 14px;
      line-height: 22px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    .ft-cont {
      height: 225px;
      padding: 35px 20px;
      .logo {
        > span {
          font-size: 25px;
        }
      }

      .info {
        font-size: 12px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
`;

export default Footer;
