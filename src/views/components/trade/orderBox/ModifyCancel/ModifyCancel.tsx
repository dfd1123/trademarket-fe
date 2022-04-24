import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useCurrentSymbol from '@/hooks/useCurrentSymbol';
import useService from '@/hooks/useService';
import OrderInput from '../OrderInput';
import CheckBox from '@/views/components/common/input/CheckBox';
import DarkSelectBox from '@/views/components/common/input/SelectBox';
import {
  YellowButton,
  YellowBorderButton,
} from '@/views/components/common/Button';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import { OrderType, TradeInfoContext } from '@/provider/TradeInfoProvider';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';
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
  orderType: 'URE',
};

const ModifyCancel = () => {
  const dispatch = useDispatch();
  const services = useService();
  const context = useContext(TradeInfoContext);
  const { order, setOrder } = context;

  const [inputs, setInputs] = useState(initialValue);
  const [symbol, setSymbol] = useState('');
  const [decimal, setDecimal] = useState(2);

  const { close, pipLowest } = useCurrentSymbol(symbol || 'BTCUSDT');

  const { setStopLimitData, sendSetLimit, sendSetStop } =
    services.trade.reqSetLimitStop();
  const { modifyOrderData, sendModifyOrder } = services.trade.reqModifyOrder();
  const { cancelOrderData, sendCancelOrder } = services.trade.reqCancelOrder();

  const convertUsdt = useMemo(() => {
    const amount = unformatNumber(inputs.amount);
    const price =
      inputs.orderType === 'URE'
        ? unformatNumber(inputs.price)
        : inputs.orderType === 'UCEL'
        ? unformatNumber(inputs.limitPrice)
        : unformatNumber(inputs.stopPrice);
    if (!inputs.price || !inputs.amount) return formatNumber(0, decimal);
    return formatNumber(amount * price, decimal);
  }, [inputs.price, inputs.limitPrice, inputs.stopPrice, inputs.amount]);

  const orderValue = useMemo(() => {
    return formatNumber(unformatNumber(convertUsdt), decimal);
  }, [convertUsdt]);

  const availableMargin = useMemo(() => {
    const amount = unformatNumber(inputs.amount);
    let price = 0;

    if (inputs.orderType === 'URE') {
      price = unformatNumber(inputs.price);
      return formatNumber(
        symbol && amount * price
          ? unformatNumber(close || '0') - unformatNumber(orderValue)
          : 0,
        decimal
      );
    } else {
      price = inputs.orderType === 'UCEL' ? unformatNumber(inputs.limitPrice) : unformatNumber(inputs.stopPrice);
      return formatNumber(
        symbol && amount * price
          ? unformatNumber(orderValue) / 10
          : 0,
        decimal
      );
    }
  }, [orderValue, close]);

  const handleChange = (value: any, name?: string) => {
    if (name) setInputs({ ...inputs, [name]: value });
  };

  const modifyOrder = () => {
    if (order && inputs.orderType) {
      if (inputs.orderType === 'URE') {
        sendModifyOrder({
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
          modType: order.modType,
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
          modType: order.modType,
          stopNo: order.stopNo,
          orderId: order.orderNo as string,
        });
      }
    }
  };

  const cancelOrder = () => {
    if (order && inputs.orderType) {
      sendCancelOrder({
        ...inputs,
        orderType: 'UODE',
        price: unformatNumber(inputs.price),
        amount: unformatNumber(inputs.amount),
        symbol: order.symbol,
        deal: order.dealType,
        orderId: order.orderNo as string,
      });
    }
  };

  useEffect(() => {
    if(decimal !== pipLowest){
      setDecimal(pipLowest ?? 2);
    }
  }, [pipLowest]);

  useEffect(() => {
    if (order) {
      setSymbol(order.symbol);
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
    if (cancelOrderData && cancelOrderData.Message) {
      dispatch(resetSpecificState({ trcode: 't3215' }));
      if(cancelOrderData.Message.flag !== 'E') setOrder(null);
    }

    if (setStopLimitData && setStopLimitData.Message) {
      dispatch(resetSpecificState({ trcode: 't3215' }));
      if(setStopLimitData.Message.flag !== 'E') setOrder(null);
    }

    if (modifyOrderData && modifyOrderData.Message) {
      dispatch(resetSpecificState({ trcode: 't3216' }));
      if(modifyOrderData.Message.flag !== 'E') setOrder(null);
    }
  }, [cancelOrderData, modifyOrderData, setStopLimitData]);

  return (
    <ModifyCancelStyle>
      <div className="order-cont">
        <div className="info">
          <b className="symbol">{symbol || 'No selected'}</b>
        </div>
        <div className="inp-holder">
          <div className="tab-cont">
            <CheckBox
              type="radio"
              name="orderType"
              label="Limit Order"
              value="URE"
              data={inputs.orderType}
              onChange={handleChange}
              ripple={null}
              disabled
            />
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
            <DarkSelectBox
              name="orderType"
              value={inputs.orderType}
              list={[
                { name: 'Limit Order', value: 'URE' },
                { name: 'Stop', value: 'UCES' },
                { name: 'Limit', value: 'UCEL' },
              ]}
              disabled
              onChange={handleChange}
            />
          </div>
          <div className="inp-cont">
            <div className="qault">
              {inputs.orderType === 'URE' && (
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
        <div className="pannel-cont">
          <div className="pannel">
            <span className="label">Order Value</span>
            <span className="value">
              <b>{orderValue}</b>USDT
            </span>
          </div>
          <div className="pannel">
            <span className="label">Available Margin</span>
            <span className="value">
              <b>{availableMargin}</b>USDT
            </span>
          </div>
        </div>
      </div>
      <div className="btn-cont">
        <YellowButton onClick={modifyOrder}>M-ORDER MODIFY</YellowButton>
        <YellowBorderButton onClick={cancelOrder}>
          M-ORDER CANCEL
        </YellowBorderButton>
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
    margin-top: 62px;
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
