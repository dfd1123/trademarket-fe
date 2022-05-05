import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router';
import Tab from '@/views/components/common/tab/Tab';
import { WalletOutletContext } from '@/views/pages/wallet/Wallet';
import { LightSelectBox } from '@/views/components/common/input/SelectBox';
import TextInput from '@/views/components/common/input/TextInput';
import BasicButton from '@/views/components/common/Button';
import ConvertRequest from '@/views/components/wallet/convert/ConvertRequest';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useService from '@/hooks/useService';
import { dateFormat } from '@/utils/dateUtils';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

const futureColumns: GridColDef[] = [
  { field: 'no', headerName: 'No', type: 'number', width: 80 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'accountingCode', headerName: 'Accounting Code', width: 200 },
  {
    field: 'point',
    headerName: 'Point',
    type: 'number',
    width: 100,
  },
  {
    field: 'pointCurrentBal',
    headerName: 'Point Current Bal.',
    type: 'number',
    width: 180,
  },
];

const exchangeColumns: GridColDef[] = [
  { width: 80, field: 'currency', headerName: 'Currency' },
  { width: 80, field: 'code', headerName: 'Code' },
  { width: 120, field: 'rate', headerName: 'Rate' },
  { width: 120, field: 'cryptoAmt', headerName: 'Crypto Amt.' },
  { width: 180, field: 'datetime', headerName: 'Date-Time' },
];

const dailyRateColumns: GridColDef[] = [
  { field: 'id', hide: true },
  { width: 240, field: 'time', headerName: 'Time' },
  { width: 180, field: 'buy', headerName: 'Buy' },
  { width: 180, field: 'sell', headerName: 'Sell' },
  { width: 360, field: 'exchange', headerName: 'Exchange Rate' },
];

const WalletConvert = () => {
  const services = useService();
  const { coin, dateRange } = useOutletContext<WalletOutletContext>();

  const { spotConvert } = services.wallet.reqSpotConvert();
  const { futureConvert } = services.wallet.reqFutureConvert();
  const { futureTradeHistory, getFutureTradeHistory } =
    services.wallet.getFutureTradeHistory();
  const { exchangeHistory, getExchangeHistory } =
    services.wallet.getExchangeHistory();
  const { tradeHistoryArr, tradeHistoryFetchData } =
    services.trade.getTradeHistory(`BIN_${coin}`, 1, 3, 2000);

  const [tabIndex, setTabIndex] = useState(0);

  const dailyRatesRows = useMemo(
    () =>
      tradeHistoryArr.reverse().map((row, index) => ({
        id: index,
        time: dateFormat(new Date(row.time)),
        buy: `${row.close * (1 + 0.0003)}`,
        sell: `${row.close * (1 - 0.0003)}`,
        exchange: `${row.close}`,
      })),
    [tradeHistoryArr]
  );

  useEffect(() => {
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);

    if (tabIndex === 0) {
      getFutureTradeHistory(startDate, endDate);
      getExchangeHistory(coin, startDate, endDate);
    } else {
      tradeHistoryFetchData({
        newSymbol: `BIN_${coin}`,
        nMinTerm: 1,
        cTermDiv: 3,
        nReqCnt: 2000,
      });
    }
  }, [coin, dateRange, tabIndex]);

  return (
    <WalletConvertStyle>
      <h4 className="sub-tit">Convert to Spot Wallet</h4>
      <ConvertRequest />
      <div className="box-cont">
        <Tab
          list={['Exchange History', 'Daily rates']}
          ripple={false}
          onChange={setTabIndex}
        />
        <div className="table-cont">
          {tabIndex === 0 ? (
            <>
              <DataGrid
                rows={futureTradeHistory}
                columns={futureColumns}
                pageSize={25}
                // pageSize={5}
                // rowsPerPageOptions={[5]}
              />
              <DataGrid
                rows={exchangeHistory}
                columns={exchangeColumns}
                pageSize={25}
                // pageSize={5}
                // rowsPerPageOptions={[5]}
              />
            </>
          ) : (
            <DataGrid
              rows={dailyRatesRows}
              columns={dailyRateColumns}
              pageSize={25}
              // pageSize={5}
              // rowsPerPageOptions={[5]}
            />
          )}
        </div>
      </div>
    </WalletConvertStyle>
  );
};

const WalletConvertStyle = styled.div`
  .box-cont {
    margin-top: 40px;
    border-top: 1px solid rgb(225, 225, 225);
  }
  .table-cont {
    display: flex;

    > div {
      width: 100%;
      height: 400px;
    }

    .css-1xy1myn-MuiDataGrid-root
      .MuiDataGrid-columnHeader--alignRight
      .MuiDataGrid-columnHeaderDraggableContainer,
    .css-1xy1myn-MuiDataGrid-root
      .MuiDataGrid-columnHeader--alignRight
      .MuiDataGrid-columnHeaderTitleContainer {
      flex-direction: row;
    }
    .css-1xy1myn-MuiDataGrid-root .MuiDataGrid-cell--textRight {
      justify-content: flex-start;
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    .table-cont {
      display:block;
      > div {
        margin-bottom: 20px;
        width: 100%;
        height: 400px;
      }
    }
  }
`;

export default WalletConvert;
