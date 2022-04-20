import { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import _debounce from 'lodash/debounce';
import { useTypedSelector } from '@/store';
import { useParams } from 'react-router';
import useService from '@/hooks/useService';
import CheckBox, {
  ButtonCheckBox,
} from '@/views/components/common/input/CheckBox';
import OrderInput from '@/views/components/trade/orderBox/OrderInput';
import RangeInput from '@/views/components/common/input/RangeInput';
import { GreenButton, RedButton } from '@/views/components/common/Button';
import { TradeInfoContext } from '@/provider/TradeInfoProvider';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';
import useToast from '@/hooks/useToast';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import DarkSelectBox from '@/views/components/common/input/SelectBox';
import OrderTable from '@/views/components/trade/orderNtrade/OrderTable';
import useCurrentSymbol from '@/hooks/useCurrentSymbol';

interface PropsType {
  mobile?: boolean;
}

const initialValue = {
  price: '',
  amount: '',
  orderType: 'UOE',
};

const NewOrder = ({ mobile }: PropsType) => {
  const radioCheckList = [10, 25, 50, 75, 100, 0];

  const services = useService();
  const { toast } = useToast();
  const { symbol: selectedSymbol } = useParams();

  const context = useContext(TradeInfoContext);
  const { marginType, leverage, order } = context;
  const { marginData } = services.user.getUserMarginData();

  const { PIP_LOWEST } = useTypedSelector(
    (state) => state.coinInfoSlice.symbols[selectedSymbol as string] || {}
  );

  const { close } = useCurrentSymbol(selectedSymbol as string);

  const { buyNewOrder, sellNewOrder } = services.trade.reqNewOrder(
    selectedSymbol as string
  );

  const [inputs, setInputs] = useState(initialValue);

  const convertUsdt = useMemo(() => {
    const amount = unformatNumber(inputs.amount);
    const price = unformatNumber(inputs.price);
    if (!inputs.price || !inputs.amount) return formatNumber(0, PIP_LOWEST);
    return formatNumber(amount * price, PIP_LOWEST);
  }, [inputs.price, inputs.amount]);

  const orderValue = useMemo(() => {
    return formatNumber(
      unformatNumber(convertUsdt) / Number(leverage),
      PIP_LOWEST
    );
  }, [convertUsdt]);

  const availableMargin = useMemo(() => {
    return formatNumber(
      unformatNumber(marginData.availableMargin as string) -
        unformatNumber(orderValue),
      PIP_LOWEST
    );
  }, [orderValue, marginData]);

  const percent = useMemo(() => {
    const price = unformatNumber(inputs.price);
    const amount = unformatNumber(inputs.amount);
    const margin = unformatNumber(marginData.availableMargin);
    const calcPercent = (((price / leverage) * amount) /margin) * 100;

    return Math.round(isNaN(calcPercent) || margin === 0 ? 0 : calcPercent);
  }, [inputs.price, inputs.amount, marginData]);

  const maxAmount = useMemo(() => {
    const price = unformatNumber(inputs.price);
    return formatNumber(unformatNumber(marginData.availableMargin as string) / (price / leverage), PIP_LOWEST)
  }, [inputs.price]);

  const handleChange = (value: any, name?: string) => {
    if (name) {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleAvailableMarginPercent = (value: number) => {
    const price = unformatNumber(inputs.price);
    const available = unformatNumber(marginData.availableMargin);
    const margin = value
      ? Number((available * (value / 100)).toFixed(PIP_LOWEST))
      : 0;
    const amount = margin
      ? formatNumber((margin / price) * leverage, PIP_LOWEST)
      : 0;

    setInputs({
      ...inputs,
      amount: amount > 200 ? '200' : formatNumber(amount, PIP_LOWEST),
    });
  };

  const buyOrder = () => {
    if (unformatNumber(availableMargin) < 0)
      return toast('The order amount is higher than the available amount.');
    buyNewOrder({ ...inputs, leverage, marginType });
  };

  const sellOrder = () => {
    if (unformatNumber(availableMargin) < 0)
      return toast('The order amount is higher than the available amount.');
    sellNewOrder({ ...inputs, leverage, marginType });
  };

  useEffect(() => {
    if (inputs.orderType === 'UOM') {
      const currentPrice = unformatNumber(String(close || 0));
      const price = unformatNumber(inputs.price);
      if (currentPrice !== price) {
        setInputs({
          ...inputs,
          price: formatNumber(currentPrice, PIP_LOWEST),
        });
      }
    }
  }, [close, inputs]);

  useEffect(() => {
    if (order) {
      const { orderType, price, amount } = order;

      console.log(formatNumber(price, PIP_LOWEST));

      setInputs({
        ...inputs,
        orderType,
        price: formatNumber(price, PIP_LOWEST),
        amount: formatNumber(amount, PIP_LOWEST),
      });
    }
  }, [order]);

  return (
    <NewOrderStyle>
      <div className="order-cont">
        <div className="info">
          <b className="symbol">{selectedSymbol}</b>
          <span className="leverage">
            leverage <em>x {leverage}</em>
          </span>
        </div>
        <div className="inp-holder">
          <div className="tab-cont">
            <CheckBox
              type="radio"
              name="orderType"
              label="Market Order"
              value="UOM"
              data={inputs.orderType}
              onChange={handleChange}
              ripple={null}
            />
            <CheckBox
              type="radio"
              name="orderType"
              label="Limit Order"
              value="UOE"
              data={inputs.orderType}
              onChange={handleChange}
              ripple={null}
            />
            <DarkSelectBox
              name="orderType"
              value={inputs.orderType}
              list={[
                { name: 'Market Order', value: 'UOM' },
                { name: 'Limit Order', value: 'UOE' },
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
                decimalCnt={PIP_LOWEST}
                onChange={handleChange}
              />
              <span className="convert-usdt">{convertUsdt} USDT</span>
            </div>
            <div className="qault">
              <OrderInput
                name="amount"
                label="Amount"
                value={inputs.amount}
                max={Number(maxAmount)}
                decimalCnt={PIP_LOWEST}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="control-box">
            <div className="easy-control">
              <div>
                <RangeInput
                  name="percent-range"
                  step={1}
                  min={0}
                  max={100}
                  value={percent}
                  trackHeight={4}
                  trackColor="#A1A1A1"
                  trackActiveColor="#FFAB2E"
                  thumbWidth={20}
                  thumbHeight={20}
                  thumbColor="#FFAB2E"
                  showLabel
                  onChange={handleAvailableMarginPercent}
                />
              </div>
              <div className="radio-btn-cont">
                {radioCheckList.map((radio) => (
                  <ButtonCheckBox
                    key={radio}
                    type="radio"
                    name="percent"
                    label={`${
                      radio === 100
                        ? 'MAX'
                        : radio === 0
                        ? 'RESET'
                        : `${radio}%`
                    }`}
                    value={radio}
                    data={percent}
                    onChange={handleAvailableMarginPercent}
                  />
                ))}
              </div>
            </div>
            <div className="pannel-cont">
              <div className="pannel">
                <span className="label">Order Value</span>
                <b className="value">{orderValue} USDT</b>
              </div>
              <div className="pannel">
                <span className="label">Available Margin</span>
                <b className="value">{availableMargin} USDT</b>
              </div>
            </div>
          </div>
          <div className="error-msg">
            <span></span>
          </div>
        </div>
      </div>
      {Boolean(mobile) && <OrderTable className="order-table" />}
      <div className="btn-cont">
        <GreenButton onClick={buyOrder}>BUY</GreenButton>
        <RedButton onClick={sellOrder}>SELL</RedButton>
      </div>
    </NewOrderStyle>
  );
};

const NewOrderStyle = styled.div`
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

    .leverage {
      font-size: 12px;
      color: #fff;

      > em {
        display: inline-block;
        margin-left: 5px;
        color: rgb(229, 96, 96);
      }
    }
  }

  .inp-holder {
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
        width: calc(100% - 18px);
      }
    }

    > .inp-cont {
      margin: 10px 0 30px;
      .qault {
        margin-bottom: 10px;
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

  .control-box {
    display: flex;
    justify-content: space-between;
    padding: 20px 0 0;
    border-top: 1px solid rgb(51, 53, 59);

    .easy-control {
      width: 205px;

      .radio-btn-cont {
        margin-top: 10px;
        text-align: center;
        ${ButtonCheckBox} {
          display: inline-block !important;
          label {
            width: 60px;
            height: 35px;
            margin: 3px;
            padding: 0 0;
            font-size: 12px;
            color: #ffffff;
            line-height: 35px;
            text-align: center;
            border: 1px solid #33353b;
            border-radius: 3px;
            background-color: #33353b;
          }

          input {
            &:checked {
              ~ label {
                color: #ffab2e;
                border: 1px solid #ffab2e;
              }
            }
          }
        }
      }
    }

    .pannel-cont {
      .pannel {
        margin-bottom: 10px;
        .label,
        .value {
          display: block;
          font-size: 12px;
          color: #fff;
          line-height: 20px;
          text-align: right;
        }
      }
    }
  }

  .error-msg {
    margin: 10px 0;
    height: 15px;
  }

  > .btn-cont {
    display: flex;
    justify-content: space-between;
    .btn {
      display: inline-block !important;
      width: calc(50% - 10px);
      height: 40px;
      font-size: 14px;
      font-weight: 700;
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    display: flex;
    flex-wrap: wrap;

    .order-cont {
      width: 55%;
      padding: 0 15px;
    }

    .order-table {
      width: 45%;
    }

    .info {
      display: none;
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
    }

    .control-box {
      .easy-control {
        width: 100%;

        .radio-btn-cont {
          ${ButtonCheckBox} {
            label {
              width: 45px;
            }
          }
        }
      }
    }
    .pannel-cont {
      display: none;
    }

    > .btn-cont {
      width: 100%;
      padding: 0 14px 15px;
      .btn {
        width: calc(50% - 3.5px);
      }
    }
  }
`;

export default NewOrder;
