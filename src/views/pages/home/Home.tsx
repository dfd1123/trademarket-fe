import React from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import { BasicButton, YellowButton } from '@/views/components/common/Button';
import homeBgImg from '@/assets/img/bg/home-bg.png';
import homeShapeImg from '@/assets/img/bg/home-shape.png';
import GraphSlider from '@/views/components/home/GraphSlider';
import useService from '@/hooks/useService';
import sectionFirstShape from '@/assets/img/bg/section-01-shape.png';
import sectionSecondShape from '@/assets/img/bg/section-02-shape.png';
import sectionThirdShape from '@/assets/img/bg/section-03-shape.png';
import sectionForthShape from '@/assets/img/bg/section-04-shape.png';

function Home() {
  const services = useService();
  services.realTime.coinPrice();

  return (
    <HomeStyle>
      <section className="visual-holder">
        <div className="intro-cont">
          <h2 className="tit">DAOBIT adds its own innovation</h2>
          <p className="sub-tit">
            DAOBIT is the next generation of crypto-currency derivatives trading
            platform. <br />
            Still lots of uers are using DAOBIT to trade.
          </p>
          <YellowButton>Join Now</YellowButton>
        </div>
        <GraphSlider />
      </section>
      <section className="double-layout">
        <div>
          <img src={sectionFirstShape} />
        </div>
        <div>
          <h2>Easy futures trading in my hands.</h2>
          <p>Check it out at DAOBIT</p>
          <YellowButton>App Download</YellowButton>
        </div>
      </section>
      <section className="double-layout reverse">
        <div>
          <img src={sectionSecondShape} />
        </div>
        <div>
          <h2>Transparent chart, Trust with traders</h2>
          <h4>Twentyfour hour Live</h4>
          <p>
            Stable chart reflection with updated mechanism, Various data being
            provided.
          </p>
          <YellowButton>Start Trading</YellowButton>
        </div>
      </section>
      <section className="double-layout third">
        <div>
          <img src={sectionThirdShape} />
        </div>
        <div>
          <h2>User-specialized platform</h2>
          <h4>Free access</h4>
          <p>
            By quick reflect the liquidity of the cryptocurrency futures market,
            we provide the most convenient platform for users. 24 hour call
            support.
          </p>
          <YellowButton>Start Trading</YellowButton>
        </div>
      </section>
      <section className="double-layout reverse forth">
        <div>
          <img src={sectionForthShape} />
        </div>
        <div>
          <h2>All time operating security system on</h2>
          <h4>Asset cannot be hacked</h4>
          <p>
          Tighter security measures were installed to better protect wallet of users from cyber attacks.
          </p>
          <YellowButton>Start Trading</YellowButton>
        </div>
      </section>
      <h1>Home</h1>
      <BasicButton>
        <Link to="/test1">테스트1</Link>
      </BasicButton>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  .visual-holder {
    margin-top: -74px;
    background-image: url(${homeBgImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;

    .intro-cont {
      max-width: 1440px;
      margin: 0 auto;
      padding: 250px 20px 100px;
      padding-top: 250px;
      background-image: url(${homeShapeImg});
      background-size: 54%;
      background-repeat: no-repeat;
      background-position: right bottom;
      .tit {
        font-size: 44px;
        font-weight: 700;
        line-height: 60px;
        color: rgb(255, 255, 255);
        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);
      }
      .sub-tit {
        margin: 50px 0;
        font-size: 20px;
        line-height: 32px;
        color: rgb(255, 255, 255);
        text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.9);
      }
      ${YellowButton} {
        width: 200px;
        height: 62px;
        font-size: 24px;
        font-weight: 700;
        border-radius: 6px;
      }
    }
  }

  .double-layout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 1450px;
    min-height: 600px;
    margin: 0 auto;
    padding: 40px 50px;

    &.reverse {
      flex-direction: row-reverse;
      > div {
        &:last-child {
          padding-right: 20%;
        }
      }
    }

    &.third{
      > div {
        &:first-child{
          margin-right: 140px;
        }
      }
    }

    &.forth{
      > div {
        &:first-child{
          text-align: right;
        }

        img{
          max-width: 410px; 
          max-height: 400px;
        }
      }
    }

    > div {
      img {
        max-width: 600px;
        max-height: 600px;
        width: 100%;
      }
      h2 {
        margin-bottom: 27px;
        font-weight: bold;
        font-size: 32px;
        line-height: 37px;
        color: #000743;
      }
      h4 {
        margin-bottom: 18px;
        font-size: 24px;
        line-height: 28px;
        color: #000743;
      }
      p {
        margin-bottom: 68px;
        font-size: 20px;
        line-height: 23px;
        color: #7b7b7b;
      }
      ${YellowButton} {
        width: 200px;
        height: 62px;
        font-size: 19px;
        font-weight: 700;
        border-radius: 6px;
      }
    }
  }
`;

export default Home;
