import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router';
import useService from '@/hooks/useService';
import { WalletOutletContext } from '@/views/pages/wallet/Wallet';
import BasicButton, {
  YellowBorderButton,
} from '@/views/components/common/Button';
import TextInput from '@/views/components/common/input/TextInput';
import { unformatNumber, formatNumber } from '@/utils/numberUtils';
import { useTypedSelector } from '@/store';

const initialValue = {
  address: '',
  amount: '0',
  password: '',
};

const WithdrawRequest = () => {
  const services = useService();
  const { coin, dateRange } = useOutletContext<WalletOutletContext>();
  const { PIP_LOWEST } = useTypedSelector(
    (state) => state.coinInfoSlice.symbols[`${coin}USDT`]
  );

  const { coinInfo, getCoinCurrentInfo } = services.wallet.getCoinCurrentInfo();
  const { reqWithdrawData, requestWitdraw } = services.wallet.requestWitdraw();
  const { getWithdrawHistory } = services.wallet.getWithdrawHistory();

  const [inputs, setInputs] = useState(initialValue);

  const fClose = useMemo(() => coinInfo?.fClose ?? 0, [coinInfo]);
  const fee = useMemo(() => {
    const obj = {
      BTC: 0.001,
      ETH: 0.01,
      USDT: 20,
      XRP: 1,
    };

    return obj[coin];
  }, [coin]);
  const actualAmount = useMemo(
    () => formatNumber(unformatNumber(inputs.amount) + fee, PIP_LOWEST ?? 2),
    [inputs.amount, fee, PIP_LOWEST]
  );

  const changeHadler = (value: any, name?: string) => {
    const feeObj = {
      BTC: 0.001,
      ETH: 0.01,
      USDT: 20,
      XRP: 1,
    };

    if (name) setInputs({ ...inputs, [name]: value });
  };

  const submitWithdraw = () => {
    const params = {
      symbol: coin,
      address: inputs.address,
      extr: '',
      amount: inputs.amount,
      closePrice: fClose,
      password: inputs.password,
    };

    requestWitdraw(params);
  };

  useEffect(() => {
    getCoinCurrentInfo(coin);
  }, [coin]);

  useEffect(() => {
    if (reqWithdrawData) {
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);

      getWithdrawHistory(coin, startDate, endDate);
    }
  }, [reqWithdrawData]);

  return (
    <WithdrawRequestStyle>
      <div className="form-req">
        <div className="inp-cont">
          <span className="label">{coin} send to</span>
          <div className="btn-with-inp">
            <TextInput
              name="address"
              value={inputs.address}
              onChange={changeHadler}
            />
            <YellowBorderButton>Check Address</YellowBorderButton>
          </div>
        </div>
        <div className="inp-cont reverse">
          <div className="main">
            <span className="label">Amount</span>
            <TextInput
              name="amount"
              value={inputs.amount}
              onChange={changeHadler}
            />
          </div>
          <div className="sub">
            <span className="label">Fee</span>
            <TextInput name="fee" value={fee} disabled />
          </div>
        </div>
        <div className="inp-cont">
          <span className="label">Actual Withdraw amount</span>
          <div className="one-inp">
            <TextInput name="actualAmount" value={actualAmount} disabled />
          </div>
        </div>
        <div className="inp-cont">
          <span className="label">Secret Password</span>
          <div className="one-inp">
            <TextInput
              name="password"
              value={inputs.password}
              onChange={changeHadler}
            />
          </div>
        </div>
        <div className="btn-cont">
          <BasicButton className="btn-req" onClick={submitWithdraw}>Request</BasicButton>
        </div>
      </div>
      <div className="sub-info">
        <div className="exchange-info">
          <b>Please note when withdrawing. Please check below!</b>
          <p>
            The withdraw from the outside wallet to your DAOBIT Wallet will take
            place after one confirmation.
            <br />
            It may take about 10 to 30 minutes.
            <br />
            Please make sure that you verify your transfer address.
            <br />
            <br />
            <br />
            DAOBIT is not responsible for any loss caused by mistranslation for
            the address.
          </p>
        </div>
      </div>
    </WithdrawRequestStyle>
  );
};

const WithdrawRequestStyle = styled.div`
  display: flex;
  align-items: flex-end;
  column-gap: 20px;
  flex-wrap: wrap;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(225, 225, 225);

  .btn-with-inp {
    display: flex;
    column-gap: 10px;
  }

  ${TextInput} {
    width: 100%;
  }

  ${YellowBorderButton} {
    width: 160px;
    height: 46px;
    font-size: 12px;
    border-radius: 4px;
    background-color: transparent;
  }

  .form-req {
    max-width: 450px;
    width: 100%;
    > .label {
      display: block;
      margin-top: 10px;
      margin-bottom: 15px;
      font-size: 15px;
      font-weight: bold;
      line-height: 20px;
    }
    .inp-cont {
      display: flex;
      flex-direction: column;
      max-width: 440px;
      margin-top: 10px;

      &.reverse {
        flex-direction: row;
        column-gap: 10px;

        .label {
          display: block;
          margin-top: 10px;
          margin-bottom: 5px;
          font-size: 15px;
          font-weight: bold;
          line-height: 20px;
        }

        .main {
          width: 100%;
        }

        .sub {
          width: 160px;
        }
      }

      .one-inp {
        max-width: 315px;
      }
    }

    .btn-cont {
      margin: 20px 0;
      .btn-req {
        max-width: 315px;
        width: 100%;
        height: 40px;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        background-color: rgb(23, 57, 89);
        border-radius: 4px;
      }
    }
  }

  .sub-info {
    margin-top: 20px;
    .exchange-info {
      display: inline-block;
      margin: 10px 0;
      padding: 20px;
      background-color: rgba(255, 107, 107, 0.04);
      border-radius: 4px;
      > b {
        display: block;
        margin-bottom: 20px;
        font-size: 13px;
        line-height: 18px;
        color: rgb(255, 107, 107);
        font-weight: 600;
      }
      > p {
        font-size: 11px;
        line-height: 15px;
        color: rgb(119, 119, 119);
      }
    }
  }
`;

export default WithdrawRequest;
