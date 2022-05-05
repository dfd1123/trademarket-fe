import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Tab from '@/views/components/common/tab/Tab';
import BasicButton from '@/views/components/common/Button';
import { LightSelectBox } from '@/views/components/common/input/SelectBox';
import TextInput from '@/views/components/common/input/TextInput';
import useService from '@/hooks/useService';
import { MOBILE_SIZE } from '@/assets/styles/responsiveBreakPoint';
import useDialog from '@/hooks/useDialog';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';
import { useTypedSelector } from '@/store';

const initialValue = {
  coin: 'BTC',
  reqAmount: '0',
  expactedCoin: 0,
  currentUsdt: 0,
  currentCoinPrice: 0,
};

const ConvertRequest = () => {
  const services = useService();
  const coin = useTypedSelector((state) => state.coinInfoSlice.symbols);
  const { prompt } = useDialog();

  const { myAssetData, getMyAsset } = services.wallet.getMyAsset();
  const { unrealProfitNLoss, getUnrealProfitNLoss } =
    services.wallet.getUnrealProfitNLoss();
  const { tradeHistoryArr, tradeHistoryFetchData } = services.trade.getTradeHistory(`BIN_${initialValue.coin}`, 1, 3, 2000);
  const {availableAmount, getAvailableAmount} = services.wallet.getAvailableAmount(initialValue.coin);
  const {spotConvert, reqSpotConvert} = services.wallet.reqSpotConvert();
  const {futureConvert, reqFutureConvert} = services.wallet.reqFutureConvert();

  const [tabIndex, setTabIndex] = useState(0);
  const [inputs, setInputs] = useState(initialValue);
  const [reqAmount, setReqAmount] = useState(0);

  const coinList = useMemo(
    () =>
      myAssetData.map((data) => ({
        name: data[1].trim(),
        value: data[1].trim(),
      })),
    [myAssetData]
  );

  const pointPosition = useMemo(
    () => coin[`${inputs.coin}USDT`]?.PIP_LOWEST ?? 2,
    [coin]
  );
  const coinRate = useMemo(() => {
    return formatNumber(tradeHistoryArr[0] ? tradeHistoryArr.reverse()[0].close : 1, pointPosition);
  }, [tradeHistoryArr]);
  const coinAmount = useMemo(() => {
    const assetData = (myAssetData || []).find(
      (asset) => asset[1].trim() === inputs.coin
    );
    return assetData ? assetData[2] : 0;
  }, [inputs.coin, myAssetData]);
  const usdtAmount = useMemo(() => {
    return unrealProfitNLoss && unrealProfitNLoss.length
      ? unrealProfitNLoss[0][6]
      : 0;
  }, [unrealProfitNLoss]);
  const expectedCoin = useMemo(
    () =>
      unformatNumber(inputs.reqAmount) /
      (unformatNumber(coinRate) * (1 + 0.0003)),
    [inputs.reqAmount, coinRate]
  );

  const handleValueChange = (value: any, name?: string) => {
    setInputs({ ...inputs, [name as string]: value });
  };

  const reqConvert = async () => {
    const password = await prompt('Password', {
      title: 'Enter your password',
      promptType: 'password',
    });

    const params = {password, symbol: inputs.coin, coinRate, reqAmount: inputs.reqAmount};

    if(tabIndex === 0) reqSpotConvert(params);
    else reqFutureConvert(params);
  };

  useEffect(() => {
    tradeHistoryFetchData({newSymbol: `BIN_${inputs.coin}`, nMinTerm: 1, cTermDiv:3, nReqCnt:2000});
    getAvailableAmount(inputs.coin);
  }, [inputs.coin]);

  useEffect(() => {
    if (spotConvert) {
      const { flag, data } = spotConvert.Message;
      switch (flag) {
        case 'E':
          alert(data);
          break;
        case '0':
          alert(data);
          handleValueChange('0', 'reqAmount')
          break;
        case 'ESC':
          break;
        default:
          alert(data);
      }
    }
  }, [spotConvert]);

  useEffect(() => {
    if (futureConvert) {
      const { flag, data } = futureConvert.Message;
      switch (flag) {
        case 'E':
          alert(data);
          break;
        case '0':
          alert(data);
          handleValueChange('0', 'reqAmount')
          break;
        case 'ESC':
          break;
        default:
          alert(data);
      }
    }
  }, [futureConvert]);

  useEffect(() => {
    getMyAsset();
    getUnrealProfitNLoss();
  }, []);

  return (
    <ConvertRequestStyle>
      <Tab list={['Spot', 'Future']} ripple={false} onChange={setTabIndex} />
      <div className="req-cont">
        <div className="req-form">
          <div className="row">
            <div className="inp-cont">
              <span className="label">Coin</span>
              <LightSelectBox
                name="coin"
                list={coinList}
                value={inputs.coin}
                onChange={handleValueChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="pannel">
              <div className="info">
                <span className="label">Exchange Rate</span>
                <span className="value red">{coinRate}</span>
              </div>
              <div className="info">
                <span className="label">Available amount</span>
                <span className="value">{formatNumber(availableAmount, pointPosition)}</span>
              </div>
            </div>
            <div className="pannel">
              <div className="info">
                <span className="label">BTC: previous balance</span>
                <span className="value">{coinAmount}</span>
              </div>
              <div className="info">
                <span className="label">USDT: previous balance</span>
                <span className="value">{usdtAmount}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="inp-cont">
              <span className="label">Exchange request amount ({tabIndex === 0 ? 'USDT' : inputs.coin})</span>
              <TextInput
                name="reqAmount"
                number
                placeholder="0"
                value={inputs.reqAmount}
                onChange={handleValueChange}
              />
            </div>
            <div className="inp-cont">
              <span className="label">Expacted {tabIndex === 0 ? inputs.coin : 'USDT(POINT)'}</span>
              <TextInput number placeholder="0" value={expectedCoin} disabled />
            </div>
          </div>
          <div className="row">
            <div className="inp-cont">
              <span className="label">{tabIndex === 0 ? 'USDT' : inputs.coin}: current balance</span>
              <TextInput number placeholder="0" value={tabIndex === 0 ? usdtAmount : coinAmount} disabled />
            </div>
            <div className="inp-cont">
              <span className="label">{tabIndex === 0 ? inputs.coin : 'USDT'}: current balance</span>
              <TextInput number placeholder="0" value={tabIndex === 0 ? coinAmount : usdtAmount} disabled />
            </div>
          </div>
        </div>
        <div className="exchange-info">
          <b>Exchange Information</b>
          <p>
            Available exchange time: 24H
            <br />
            Cancellation after exchange is not possible.
            <br />
            We use Binance exchange rate as the base rate.
          </p>
        </div>
      </div>
      <div className="btn-cont">
        <BasicButton className="btn-req" onClick={reqConvert}>
          Request
        </BasicButton>
      </div>
    </ConvertRequestStyle>
  );
};

const ConvertRequestStyle = styled.div`
  .req-cont {
    display: flex;
    align-items: end;
    flex-wrap: wrap;
  }
  .req-form {
    width: 750px;
    .row {
      margin-bottom: 10px;
      > div {
        display: inline-block;
        width: 100%;
        max-width: 328px;
        margin-right: 32px;
      }
      .inp-cont {
        > .label {
          display: block;
          margin-top: 10px;
          margin-bottom: 4px;
          font-size: 15px;
          font-weight: bold;
          line-height: 20px;
        }

        ${LightSelectBox} {
          width: 100%;
          font-size: 15px;
          border: 1px solid #ddd;
        }

        ${TextInput} {
          width: 100%;
          input {
            color: #383838;
            border: 1px solid rgb(221, 221, 221);

            &:disabled{
              background-color: #f0f0f0;
            }
          }
        }
      }
      .pannel {
        margin-bottom: 7px;
        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          line-height: 19px;
          color: rgb(56, 56, 56);
          > .value {
            &.red {
              color: rgb(248, 88, 90);
            }
          }
        }
      }
    }
  }
  .exchange-info {
    max-width: 328px;
    width: 100%;
    height: 146px;
    margin: 10px 0;
    padding: 20px;
    background-color: rgb(245, 245, 245);
    border-radius: 4px;
    > b {
      font-size: 13px;
      line-height: 18px;
      color: rgb(23, 57, 89);
      font-weight: 600;
    }
    > p {
      font-size: 11px;
      line-height: 15px;
      color: rgb(119, 119, 119);
    }
  }

  .btn-cont {
    margin: 20px 0;
    .btn-req {
      max-width: 328px;
      width: 100%;
      height: 40px;
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      background-color: rgb(23, 57, 89);
      border-radius: 4px;
    }
  }

  @media (max-width: ${MOBILE_SIZE}) {
    .req-form {
      width: 100%;
      .row {
        > div {
          max-width: 100%;
        }
      }
    }
    .exchange-info {
      max-width: 100%;
    }
    .btn-cont {
      .btn-req {
        max-width: 100%;
      }
    }
  }
`;

export default ConvertRequest;
