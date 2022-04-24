import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import OrderInput from '../OrderInput';
import CheckBox from '@/views/components/common/input/CheckBox';
import DarkSelectBox from '@/views/components/common/input/SelectBox';
import { YellowButton } from '@/views/components/common/Button';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import { OrderType, TradeInfoContext } from '@/provider/TradeInfoProvider';
import useCoinList from '@/hooks/useCoinList';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';
import useService from '@/hooks/useService';
import { useDispatch } from 'react-redux';
import { resetSpecificState } from '@/store/asyncData/asyncData';

const initialValue: {
  price: string;
  limitPrice: string;
  stopPrice: string;
  amount: string;
  orderType: OrderType;
} = {
  price: '',
  limitPrice: '',
  stopPrice: '',
  amount: '',
  orderType: 'UCES',
};

const StopLimit = () => {
  const dispatch = useDispatch();
  const services = useService();
  const context = useContext(TradeInfoContext);
  const { order, setOrder } = context;

  const {coinList} = useCoinList();

  const [inputs, setInputs] = useState(initialValue);
  const [symbol, setSymbol] = useState('');
  const [decimal, setDecimal] = useState(2);

  const {setStopLimitData, sendSetStop, sendSetLimit, sendSetMarket} = services.trade.reqSetLimitStop();

  const handleChange = (value: any, name?: string) => {
    if (name) setInputs({ ...inputs, [name]: value });
  };

  const setStopLimit = () => {
    if (order && inputs.orderType) {
      if (inputs.orderType === 'UCM') {
        sendSetMarket({
          ...inputs,
          price: unformatNumber(inputs.price),
          amount: unformatNumber(inputs.amount),
          symbol: order.symbol,
          deal: order.dealType,
          orderId: order.orderNo as string,
        });
      } else if (inputs.orderType === 'UCEL') {
        sendSetLimit({
          ...inputs,
          price: unformatNumber(inputs.price),
          limitPrice: unformatNumber(inputs.limitPrice),
          amount: unformatNumber(inputs.amount),
          symbol: order.symbol,
          deal: order.dealType,
          limitNo: order.limitNo,
          orderId: order.orderNo as string,
        });
      } else if (inputs.orderType === 'UCES') {
        sendSetStop({
          ...inputs,
          price: unformatNumber(inputs.price),
          stopPrice: unformatNumber(inputs.stopPrice),
          amount: unformatNumber(inputs.amount),
          symbol: order.symbol,
          deal: order.dealType,
          stopNo: order.stopNo,
          orderId: order.orderNo as string,
        });
      }
    }
  };

  useEffect(() => {
    if (order) {
      const targetCoin = coinList.find(coin => coin.CUR_NO === order.symbol);
      setSymbol(order.symbol);
      setDecimal(targetCoin?.PIP_LOWEST ?? 2);
      setInputs({
        ...inputs,
        price: formatNumber(order.price, decimal),
        limitPrice: formatNumber(order.limitPrice, decimal),
        stopPrice: formatNumber(order.stopPrice, decimal),
        amount: formatNumber(order.amount, decimal),
        orderType: order.orderType,
      });
    }
  }, [order, decimal]);

  useEffect(() => {
    if (setStopLimitData && setStopLimitData.Message) {
      dispatch(resetSpecificState({ trcode: 't3215' }));
      if(setStopLimitData.Message.flag !== 'E') setOrder(null);
    }
  }, [setStopLimitData]);

  return (
    <StopLimitStyle>
      <div className="order-cont">
        <div className="info">
          <b className="symbol">{symbol || 'No selected'}</b>
        </div>
        <div className="inp-holder">
          <div className="tab-cont">
            <CheckBox
              type="radio"
              name="orderType"
              label="Stop"
              value="UCES"
              data={inputs.orderType}
              onChange={handleChange}
              ripple={null}
              disabled
            />
            <CheckBox
              type="radio"
              name="orderType"
              label="Limit"
              value="UCEL"
              data={inputs.orderType}
              onChange={handleChange}
              ripple={null}
              disabled
            />
            <CheckBox
              type="radio"
              name="orderType"
              label="MARKET"
              value="UCM"
              data={inputs.orderType}
              onChange={handleChange}
              ripple={null}
              disabled
            />
            <DarkSelectBox
              name="orderType"
              value={inputs.orderType}
              list={[
                { name: 'Stop', value: 'UCES' },
                { name: 'Limit', value: 'UCEL' },
                { name: 'Market', value: 'UCM' },
              ]}
              disabled
              onChange={handleChange}
            />
          </div>
          <div className="inp-cont">
            <div className="qault">
            {inputs.orderType === 'UCM' && (
                <OrderInput
                  name="price"
                  label="Price(USDT)"
                  value={inputs.price}
                  decimalCnt={decimal}
                  onChange={handleChange}
                />
              )}
              {inputs.orderType === 'UCES' && (
                <OrderInput
                  name="stopPrice"
                  label="S-Price(USDT)"
                  value={inputs.stopPrice}
                  decimalCnt={decimal}
                  onChange={handleChange}
                />
              )}
              {inputs.orderType === 'UCEL' && (
                <OrderInput
                  name="limitPrice"
                  label="L-Price(USDT)"
                  value={inputs.limitPrice}
                  decimalCnt={decimal}
                  onChange={handleChange}
                />
              )}
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
        <YellowButton onClick={setStopLimit}>MARKET</YellowButton>
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
