import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import useCurrentSymbol from '@/hooks/useCurrentSymbol';
import { MOBILE_SIZE, SMALL_MOBILE_SIZE, TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import { UP_COLOR, DOWN_COLOR } from '@/data/colorData';

const CoinInfoPannel = React.memo(() => {
  const { symbol: selectedSymbol } = useParams();
  const { close, szHigh, szLow, preClose, changePerc, isUp, maxOrderCount } =
    useCurrentSymbol(selectedSymbol as string);

  return (
    <CoinInfoPannelStyle className={`${!close && 'skeleton'}`}>
      <strong className={`close-price ${isUp ? 'up' : 'down'}`}>$ {close}</strong>
      <div className="pannel-box">
        <span className="label">Max Contract Volume</span>
        <span className="value">{maxOrderCount}</span>
      </div>
      <div className="pannel-box">
        <span className="label">24H Change %</span>
        <span className="value">
          {preClose}{' '}
          <em className={`${isUp ? 'up' : 'down'}`}>{changePerc}%</em>
        </span>
      </div>
      <div className="pannel-box">
        <span className="label">24H High</span>
        <span className="value">{szHigh}</span>
      </div>
      <div className="pannel-box">
        <span className="label">24H Low</span>
        <span className="value">{szLow}</span>
      </div>
    </CoinInfoPannelStyle>
  );
});

const CoinInfoPannelStyle = styled.div`
  margin-left: 30px;

  > * {
    display: inline-block;
    vertical-align: middle;
  }

  .close-price {
    min-width: 50px;
    height: 22px;
    margin: 0 10px;
    font-size: 22px;
    font-weight: 400;
    color: #41da78;

    &.up {
      color: ${UP_COLOR};
    }
    &.down {
      color: ${DOWN_COLOR};
    }
  }

  .pannel-box {
    margin: 0 15px;
    > span {
      display: block;

      &.label {
        margin-bottom: 6px;
        font-size: 12px;
        color: #a1a1a1;
      }
      &.value {
        height: 14px;
        font-size: 12px;
        color: #e1e1e1;

        > em {
          &.up {
            color: ${UP_COLOR};
          }
          &.down {
            color: ${DOWN_COLOR};
          }
        }
      }
    }
  }

  &.skeleton {
    .close-price {
      background-color: rgba(255, 255, 255, 0.2);
      text-indent: -9999px;
    }
    .pannel-box {
      > span {
        &.value {
          background-color: rgba(255, 255, 255, 0.2);
          text-indent: -9999px;

          > em {
            display: none;
          }
        }
      }
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    margin-left: 0;
    margin-top: 19px;

    .close-price {
      display: block;
      position: absolute;
      top: 17px;
      right: 0;
      z-index: 1;
    }

    .pannel-box {
        margin: 0 0;
        margin-right: 60px;
        &:nth-of-type(1){
            margin-left:0;
        }
    }
  }

  @media (max-width: ${MOBILE_SIZE}) {
    .pannel-box {
      margin-bottom: 14px;
    }
  }

  @media (max-width: ${SMALL_MOBILE_SIZE}) {
    .pannel-box {
      margin: 0 0;
      width: 50%;
      margin-bottom: 14px;
    }
  }
`;

export default CoinInfoPannel;
