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
import reviewRatingShape from '@/assets/img/bg/review-rating-shape.png';
import speakerIcon from '@/assets/img/icon/ico-speaker.svg';
import sectionLiFirShape from '@/assets/img/bg/section5-list1-shape.png';
import sectionLiSecShape from '@/assets/img/bg/section5-list2-shape.png';
import sectionLiThirdShape from '@/assets/img/bg/section5-list3-shape.png';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

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
        <div className="holder">
          <div>
            <img src={sectionFirstShape} />
          </div>
          <div>
            <h2>Easy futures trading in my hands.</h2>
            <p>Check it out at DAOBIT</p>
            <YellowButton>App Download</YellowButton>
          </div>
        </div>
      </section>
      <section className="double-layout reverse">
        <div className="holder">
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
        </div>
      </section>
      <section className="double-layout third">
        <div className="holder">
          <div>
            <img src={sectionThirdShape} />
          </div>
          <div>
            <h2>User-specialized platform</h2>
            <h4>Free access</h4>
            <p>
              By quick reflect the liquidity of the cryptocurrency futures
              market, we provide the most convenient platform for users. 24 hour
              call support.
            </p>
            <YellowButton>Start Trading</YellowButton>
          </div>
        </div>
      </section>
      <section className="double-layout reverse forth">
        <div className="holder">
          <div>
            <img src={sectionForthShape} />
          </div>
          <div>
            <h2>All time operating security system on</h2>
            <h4>Asset cannot be hacked</h4>
            <p>
              Tighter security measures were installed to better protect wallet
              of users from cyber attacks.
            </p>
            <YellowButton>Start Trading</YellowButton>
          </div>
        </div>
      </section>
      <section className="high-review">
        <div className="holder">
          <div className="intro">
            <h2>Highest Customer Satisfaction</h2>
            <p>
              The convenience of DAOBIT that people who have experienced
              User-Authenticated platform
            </p>
            <img src={reviewRatingShape} alt="high-review" />
          </div>
          <div className="review-list-cont">
            <div className="review-box">
              <span>
                DAOBIT is the best way for users to trade bitcoin futures. It
                has a simple structure and even beginners can trade easily.
              </span>
            </div>
            <div className="review-box">
              <span>
                We are committed to creating a fair, transparent and efficient
                exchange environment.
              </span>
            </div>
            <div className="review-box">
              <span>
                DAOBIT offers the best-in-class market depth, each trade
                executed with minimal price impact.
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-main-qa">
        <div className="holder">
          <ul>
            <li>
              <img src={sectionLiFirShape} />
              <span>Is this your first time with DAOBIT? Guide Info</span>
            </li>
            <li>
              <img src={sectionLiSecShape} />
              <span>Explore DAOBIT Order Types</span>
            </li>
            <li>
              <img src={sectionLiThirdShape} />
              <span>DAOBIT Transaction Fee Info</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="last-sec">
        <div className="holder">
          <h2>Start Trading Now</h2>
          <YellowButton>Join Now</YellowButton>
        </div>
      </section>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  .visual-holder {
    margin-top: -74px;
    background-color: #f3f6f8;
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
    background-color: #fff;
    .holder {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      max-width: 1450px;
      min-height: 600px;
      margin: 0 auto;
      padding: 40px 50px;

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

    &.reverse {
      background-color: #f3f6f8;
      .holder {
        flex-direction: row-reverse;

        > div {
          &:last-child {
            padding-right: 20%;
          }
        }
      }
    }

    &.third {
      .holder {
        > div {
          &:first-child {
            margin-right: 140px;
          }
        }
      }
    }

    &.forth {
      .holder {
        > div {
          &:first-child {
            text-align: right;
          }

          img {
            max-width: 410px;
            max-height: 400px;
          }
        }
      }
    }
  }

  .high-review {
    background-color: #f3f6f8;
    .holder {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      max-width: 1450px;
      min-height: 600px;
      margin: 0 auto;
      padding: 40px 50px;

      .intro {
        max-width: 600px;
        padding-right: 100px;
        h2 {
          font-size: 32px;
          font-weight: 700;
          line-height: 37px;
          color: #000743;
        }

        p {
          margin-top: 27px;
          margin-bottom: 68px;
          font-size: 20px;
          line-height: 23px;
          color: #7b7b7b;
        }

        img {
          width: 370px;
        }
      }

      .review-list-cont {
        max-width: 640px;

        .review-box {
          margin-bottom: 26px;
          padding: 34px 30px;
          background: #ffffff;
          box-shadow: 0px 6px 26px rgb(0 0 0 / 10%);
          border-radius: 10px;

          > span {
            display: block;
            padding-left: 30px;
            font-size: 16px;
            line-height: 22px;
            background-image: url(${speakerIcon});
            background-position: left 5px;
            background-size: 15px;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }

  .faq-main-qa {
    background-color:#fff;
    .holder {
      max-width: 1450px;
      margin: 0 auto;
      padding: 150px 50px 200px;
      ul {
        display: flex;
        justify-content: space-between;
      }
      li {
        min-width: 283px;
        width: 30%;
        padding: 20px;
        text-align: center;
        background: #ffffff;
        box-shadow: 0px 6px 26px rgb(0 0 0 / 10%);
        border-radius: 10px;
        text-align: center;
        img {
          display: block;
          max-width: 100%;
          max-height: 150px;
          margin: 0 auto 40px;
        }
        span {
          position: relative;
          display: inline-block;
          font-size: 17px;
          line-height: 20px;
          text-align: center;
          color: #575757;

          &::before {
            position: absolute;
            left: 50%;
            top: 12px;
            transform: translateX(-50%);
            content: '';
            width: 102%;
            height: 12px;
            background: rgba(237, 116, 67, 0.3);
          }
        }
      }
    }
  }

  .last-sec {
    background-color: #f3f6f8;
    .holder {
      max-width: 1450px;
      margin: 0 auto;
      padding: 103px 0;
      text-align: center;

      h2 {
        margin-bottom: 50px;
        font-weight: 700;
        font-size: 40px;
        line-height: 46px;
        color: #000743;
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

  @media (max-width: ${TABLET_SIZE}) {
    .visual-holder {
      margin-top: -43px;
      .intro-cont {
        padding: 150px 20px 70px;
        padding-top: 95px;
        background-size: 45%;

        .tit {
          font-size: 20px;
          line-height: 33px;
        }

        .sub-tit {
          margin: 15px 0;
          font-size: 14px;
          line-height: 20px;
        }

        ${YellowButton} {
          width: 135px;
          height: 40px;
          font-size: 14px;
        }
      }
    }

    .double-layout {
      .holder {
        display: block;
        max-width: 680px;
        min-height: 0;
        margin: 0 auto;
        padding: 68px 20px;
        text-align: center;
        > div {
          img {
            max-width: 200px;
            max-height: 300px;
            margin-bottom: 20px;
          }
          h2 {
            margin-bottom: 5px;
            font-weight: bold;
            font-size: 19px;
            line-height: 24px;
          }
          h4 {
            margin-bottom: 12px;
            font-size: 17px;
            line-height: 20px;
          }
          p {
            margin-bottom: 22px;
            font-size: 14px;
            line-height: 18px;
          }
          ${YellowButton} {
            width: 150px;
            height: 40px;
            font-size: 14px;
          }
        }
      }

      &.reverse {
        .holder {
          > div {
            &:last-child {
              padding-right: 0;
            }
          }
        }
      }

      &.third {
        .holder {
          > div {
            &:first-child {
              margin-right: 0;
            }
          }
        }
      }

      &.forth {
        .holder {
          > div {
            img {
              max-width: 200px;
              max-height: 300px;
            }
            &:first-child {
              text-align: center;
            }
          }
        }
      }
    }

    .high-review {
      .holder {
        display: block;
        min-height: 0;
        margin: 0 auto;
        padding: 30px 20px;
        text-align: center;

        .intro {
          max-width: none;
          padding-right: 0;
          h2 {
            font-size: 19px;
            line-height: 24px;
          }

          p {
            margin: 12px 0;
            margin-bottom: 20px;
            font-size: 14px;
            line-height: 18px;
          }

          img {
            width: 153px;
          }
        }

        .review-list-cont {
          max-width: 640px;
          margin: 0 auto;
          margin-top: 40px;

          .review-box {
            margin-bottom: 10px;
            padding: 10px;

            > span {
              padding-left: 25px;
              font-size: 12px;
              line-height: 17px;
              background-position: left 3px;
              background-size: 12px;
              text-align: left;
            }
          }
        }
      }
    }

    .faq-main-qa {
      .holder {
        padding: 45px 20px;
        ul {
          display: block;
          max-width: 680px;
          margin:0 auto;
        }
        li {
          width: 100%;
          margin-bottom: 25px;
          box-shadow: 0px 6px 13px rgb(0 0 0 / 10%);
          border-radius: 6px;
          img {
            max-height: 100px;
            margin: 0 auto 22px;
          }
          span {
            font-size: 15px;
            line-height: 16px;

            &::before {
              top: 10px;
            }
          }
        }
      }
    }

    .last-sec {
    .holder {
      padding: 60px 0;

      h2 {
        margin-bottom: 36px;
        font-size: 18px;
        line-height: 21px;
      }

      ${YellowButton} {
        width: 120px;
        height: 42px;
        font-size: 13px;
      }
    }
  }
  }
`;

export default Home;
