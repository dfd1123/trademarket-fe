import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import OrderInput from '../OrderInput';
import CheckBox from '@/views/components/common/input/CheckBox';
import DarkSelectBox from '@/views/components/common/input/SelectBox';
import { YellowButton } from '@/views/components/common/Button';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

const initialValue = {
  price: 0,
  amount: 0,
  orderType: 'UOE',
};

const StopLimit = () => {
  const [inputs, setInputs] = useState(initialValue);
  const [decimal, setDecimal] = useState(2);

  const handleChange = (value: any, name?: string) => {
    if (name) setInputs({ ...inputs, [name]: value });
  };

  return (
    <StopLimitStyle>
      <div className="order-cont">
        <div className="info">
          <b className="symbol">No selected</b>
        </div>
        <div className="inp-holder">
          <div className="tab-cont">
            <CheckBox
              type="radio"
              name="orderType"
              label="Stop"
              value="UOM"
              data={inputs.orderType}
              onChange={handleChange}
              ripple={null}
            />
            <CheckBox
              type="radio"
              name="orderType"
              label="Limit"
              value="UOE"
              data={inputs.orderType}
              onChange={handleChange}
              ripple={null}
            />
            <CheckBox
              type="radio"
              name="orderType"
              label="MARKET"
              value="UOE"
              data={inputs.orderType}
              onChange={handleChange}
              ripple={null}
            />
            <DarkSelectBox
              name="orderType"
              value={inputs.orderType}
              list={[
                { name: 'Stop', value: 'UOM' },
                { name: 'Limit', value: 'UOE' },
                { name: 'Market', value: 'UOE' },
              ]}
              onChange={handleChange}
            />
          </div>
          <div className="inp-cont">
            <div className="qault">
              <OrderInput
                name="price"
                label="Price(USDT)"
                value={inputs.price}
                decimalCnt={decimal}
                onChange={handleChange}
              />
            </div>
            <div className="qault">
              <OrderInput
                name="amount"
                label="Amount"
                value={inputs.amount}
                decimalCnt={decimal}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="error-msg">
            <span></span>
          </div>
        </div>
      </div>
      <div className="btn-cont">
        <YellowButton>MARKET</YellowButton>
      </div>
    </StopLimitStyle>
  );
};

const StopLimitStyle = styled.div`
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0 11px;
    border-bottom: 1px solid rgb(51, 53, 59);

    .symbol {
      font-size: 18px;
      font-weight: 700;
      color: #fff;
    }
  }

  .inp-holder {
    border-bottom: 1px solid rgb(51, 53, 59);
    .tab-cont {
      padding: 15px 0;
      ${CheckBox} {
        label {
          margin-right: 25px;
          padding-left: 20px;
          font-size: 14px;
          color: #fff;

          &::before {
            top: 3px;
          }

          &::after {
            top: 7px;
          }
        }
      }

      ${DarkSelectBox} {
        display: none;
        width: 100%;
      }
    }

    > .inp-cont {
      margin: 10px 0 30px;
      .qault {
        margin-bottom: 29px;
        .convert-usdt {
          display: block;
          margin: 7px 20px 0;
          font-size: 12px;
          color: #fff;
          text-align: right;
        }
      }
    }
  }

  > .btn-cont {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: calc(100% - 40px);
    margin: 14px 20px 12px 20px;

    .btn {
      display: inline-block !important;
      width: 100%;
      height: 40px;
      font-size: 14px;
      font-weight: 700;
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    .order-cont {
      padding: 20px 15px;
    }

    .inp-holder {
      .tab-cont {
        ${CheckBox} {
          display: none;
        }
        ${DarkSelectBox} {
          display: block;
        }
      }

      > .inp-cont {
        margin: 10px 0 20px;
        .qault {
          margin-bottom: 10px;
        }
      }
    }

    > .btn-cont {
      position: unset;
      padding-bottom: 15px;
      /* width: 100%;
      padding: 0 14px 15px;
      .btn {
        width: calc(50% - 3.5px);
      } */
    }
  }
`;

export default StopLimit;
