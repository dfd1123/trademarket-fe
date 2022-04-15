import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import OrderInput from '../OrderInput';
import CheckBox from '@/views/components/common/input/CheckBox';
import DarkSelectBox from '@/views/components/common/input/SelectBox';
import {
  YellowButton,
  YellowBorderButton,
} from '@/views/components/common/Button';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

const initialValue = {
  price: 0,
  amount: 0,
  orderType: 'UOE',
};

const ModifyCancel = () => {
  const [inputs, setInputs] = useState(initialValue);
  const [decimal, setDecimal] = useState(2);

  const handleChange = (value: any, name?: string) => {
    if (name) setInputs({ ...inputs, [name]: value });
  };

  return (
    <ModifyCancelStyle>
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
        <div className="pannel-cont">
          <div className="pannel">
            <span className="label">Order Value</span>
            <span className="value">
              <b>0</b>USDT
            </span>
          </div>
          <div className="pannel">
            <span className="label">Available Margin</span>
            <span className="value">
              <b>0</b>USDT
            </span>
          </div>
        </div>
      </div>
      <div className="btn-cont">
        <YellowButton>M-ORDER MODIFY</YellowButton>
        <YellowBorderButton>M-ORDER CANCEL</YellowBorderButton>
      </div>
    </ModifyCancelStyle>
  );
};

const ModifyCancelStyle = styled.div`
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

  .pannel-cont {
    .pannel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 25px 0 35px;

      > span {
        font-size: 13px;
        color: #fff;
        > b {
          margin-right: 7px;
        }
      }
    }
  }

  > .btn-cont {
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
    .btn {
      display: inline-block !important;
      width: calc(50% - 10px);
      height: 40px;
      font-size: 12px;
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
      width: 100%;
      margin-top: 0px;
      padding: 0 14px 15px;
      .btn {
        width: calc(50% - 3.5px);
      }
    }
  }
`;

export default ModifyCancel;
