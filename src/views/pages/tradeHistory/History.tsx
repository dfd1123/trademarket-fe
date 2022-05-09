import React, { useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router';
import ControlPanel from '@/views/components/tradeHistory/ControlPanel';
import Tab from '@/views/components/common/tab/Tab';
import { MOBILE_SIZE } from '@/assets/styles/responsiveBreakPoint';
import { dateFormat } from '@/utils/dateUtils';

export interface HistoryOutletContext {
    date: string;
    dateRange: string[];
}

const History = () => {
  const today = new Date();
  const fromDay = new Date(new Date().setDate(new Date().getDate() - 30));
  const [date, setDate] = useState(dateFormat(today));
  const [dateRange, setDateRange] = useState<string[]>([
    dateFormat(fromDay),
    dateFormat(today),
  ]);
  return (
    <div>
      <ControlPanel date={date} dateRange={dateRange} onChangeDate={setDate} onChangeDateRange={setDateRange} />
      <HistoryStyle>
        <Outlet context={{date, dateRange}} />
      </HistoryStyle>
    </div>
  );
};

const HistoryStyle = styled.div`
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

export default History;
