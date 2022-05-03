import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Tab from '@/views/components/common/tab/Tab';
import BasicButton from '@/views/components/common/Button';
import { LightSelectBox } from '@/views/components/common/input/SelectBox';
import TextInput from '@/views/components/common/input/TextInput';
import useService from '@/hooks/useService';
import { MOBILE_SIZE } from '@/assets/styles/responsiveBreakPoint';
import useDialog from '@/hooks/useDialog';

const ConvertRequest = () => {
  const services = useService();
  const {prompt} = useDialog();

  const { myAssetData, getMyAsset } = services.wallet.getMyAsset();

  const [tabIndex, setTabIndex] = useState(0);
  const [reqAmount, setReqAmount] = useState(0);

  const coinList = useMemo(
    () =>
      myAssetData.map((data) => ({
        name: data[1].trim(),
        value: data[1].trim(),
      })),
    [myAssetData]
  );

  const reqConvert = async () => {
    const password = await prompt('Password', {title: 'Enter your password', promptType: 'password'});

    if(reqAmount === 0){
      alert('Please enter a quantity of 0 or more');
      return;
    }else if(!password) return;

    
  }

  useEffect(() => {
    getMyAsset();
  }, []);

  return (
    <ConvertRequestStyle>
      <Tab list={['Spot', 'Future']} ripple={false} onChange={setTabIndex} />
      <div className="req-cont">
        <div className="req-form">
          <div className="row">
            <div className="inp-cont">
              <span className="label">Coin</span>
              <LightSelectBox name="coin" list={coinList} />
            </div>
          </div>
          <div className="row">
            <div className="pannel">
              <div className="info">
                <span className="label">Exchange Rate</span>
                <span className="value red">38612.22</span>
              </div>
              <div className="info">
                <span className="label">Available amount</span>
                <span className="value">0.11</span>
              </div>
            </div>
            <div className="pannel">
              <div className="info">
                <span className="label">BTC: previous balance</span>
                <span className="value">0.11607</span>
              </div>
              <div className="info">
                <span className="label">USDT: previous balance</span>
                <span className="value">180588.49</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="inp-cont">
              <span className="label">Exchange request amount (USDT)</span>
              <TextInput number placeholder="0" />
            </div>
            <div className="inp-cont">
              <span className="label">Expacted BTC</span>
              <TextInput number placeholder="0" />
            </div>
          </div>
          <div className="row">
            <div className="inp-cont">
              <span className="label">USDT: current balance</span>
              <TextInput number placeholder="0" />
            </div>
            <div className="inp-cont">
              <span className="label">BTC: current balance</span>
              <TextInput number placeholder="0" />
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
        <BasicButton className="btn-req" onClick={reqConvert}>Request</BasicButton>
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
