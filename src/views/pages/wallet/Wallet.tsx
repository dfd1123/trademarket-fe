import React, { useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router';
import ControlPanel from '@/views/components/wallet/ControlPanel';
import Tab from '@/views/components/common/tab/Tab';
import NoData from '@/views/components/common/NoData';
import { MOBILE_SIZE } from '@/assets/styles/responsiveBreakPoint';
import { dateFormat } from '@/utils/dateUtils';

export interface WalletOutletContext {
  coin: string;
  date: string;
  dateRange: string[];
}

const Wallet = () => {
  const today = new Date();
  const fromDay = new Date(new Date().setDate(new Date().getDate() - 30));

  const [coin, setCoin] = useState('BTC');
  const [date, setDate] = useState(dateFormat(today));
  const [dateRange, setDateRange] = useState<string[]>([
    dateFormat(fromDay),
    dateFormat(today),
  ]);

  const changeCoinHandle = (symbol: string) => {
    console.log('JW', symbol);
    if(symbol !== coin) setCoin(symbol);
  }

  return (
    <div>
      <ControlPanel coin={coin} date={date} dateRange={dateRange} onChangeCoin={changeCoinHandle} onChangeDate={setDate} onChangeDateRange={setDateRange} />
      <WalletStyle>
        <Outlet context={{coin, date, dateRange}} />
      </WalletStyle>
    </div>
  );
};

const WalletStyle = styled.div`
  min-height: 300px;
  background-color: #fff;
  > div {
    max-width: 1180px;
    margin: 0 auto;
    padding: 50px 20px;
  }

  .sub-tit {
    font-size: 26px;
    font-weight: bold;
    color: rgb(56, 56, 56);
  }

  ${Tab} {
    margin: 40px 0 20px;
    button {
      margin-right: 5px;
      padding: 0 5px;
      font-size: 14px;
      line-height: 26px;
      color: rgb(153, 153, 153);
      border-radius: 0;

      &.active {
        color: rgb(23, 57, 89);
        background-color: transparent;
        border-bottom: 1px solid rgb(23, 57, 89);
      }
    }
  }

  ${NoData} {
    color: #666;
  }

  @media (max-width: ${MOBILE_SIZE}) {
    > div {
      max-width: 1180px;
      margin: 0 auto;
      padding: 36px 20px;
    }

    .sub-tit {
      font-size: 17px;
      font-weight: bold;
      color: rgb(56, 56, 56);
    }
  }
`;

export default Wallet;
