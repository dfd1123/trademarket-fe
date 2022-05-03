import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router';
import { WalletOutletContext } from '@/views/pages/wallet/Wallet';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useService from '@/hooks/useService';

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'no', headerName: 'No', type: 'number', width: 100 },
  { field: 'accountingCode', headerName: 'Accounting Code', width: 200 },
  {
    field: 'point',
    headerName: 'Point',
    type: 'number',
    width: 150,
  },
  {
    field: 'pointCurrentBal',
    headerName: 'Point Current Bal.',
    type: 'number',
    width: 250,
  },
  {
    field: 'excutionNo',
    headerName: 'Excution No',
    type: 'number',
    width: 250,
  },
];

const WalletFutureTrade = () => {
  const services = useService();
  const { coin, dateRange } = useOutletContext<WalletOutletContext>();

  const { loading, noData, futureTradeHistory, getFutureTradeHistory } =
    services.wallet.getFutureTradeHistory();

  const list = useMemo(
    () => futureTradeHistory.map((info, id) => ({ ...info, id })),
    [futureTradeHistory]
  );

  useEffect(() => {
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);

    getFutureTradeHistory(startDate, endDate);
  }, [coin, dateRange]);

  console.log(futureTradeHistory);

  return (
    <WalletFutureTradeStyle>
      <h4 className="sub-tit">Future Trade</h4>
      <p className="sub-info">Exchange History</p>
      <div className="box-cont">
        <div style={{ height: 800, width: '100%' }}>
          {!loading && (
            <DataGrid
              rows={list}
              columns={columns}
              pageSize={25}
              // rowsPerPageOptions={[5]}
            />
          )}
        </div>
      </div>
    </WalletFutureTradeStyle>
  );
};

const WalletFutureTradeStyle = styled.div`
  .sub-info {
    font-size: 12px;
    color: rgb(93, 93, 93);
    margin: 30px 0 30px;
  }
  .box-cont {
    .css-1xy1myn-MuiDataGrid-root .MuiDataGrid-columnHeader--alignRight .MuiDataGrid-columnHeaderDraggableContainer, .css-1xy1myn-MuiDataGrid-root .MuiDataGrid-columnHeader--alignRight .MuiDataGrid-columnHeaderTitleContainer{
        flex-direction: row;
    }
    .css-1xy1myn-MuiDataGrid-root .MuiDataGrid-cell--textRight{
        justify-content: flex-start;
    }
  }
`;

export default WalletFutureTrade;
