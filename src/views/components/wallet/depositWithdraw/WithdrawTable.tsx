import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useService from '@/hooks/useService';
import { WalletOutletContext } from '@/views/pages/wallet/Wallet';
import { useOutletContext } from 'react-router';

const withdrawColumns: GridColDef[] = [
  { field: 'id', hide: true },
  { minWidth: 86, field: 'date', headerName: 'Date' },
  { minWidth: 42, field: 'no', headerName: 'No' },
  { minWidth: 148, field: 'accountNo', headerName: 'Account No' },
  { minWidth: 136, field: 'datetime', headerName: 'DateTime' },
  { minWidth: 340, field: 'walletAddress', headerName: 'Wallet Address' },
  { minWidth: 40, field: 'amount', headerName: 'Amount' },
  { minWidth: 52, field: 'symbol', headerName: 'Symbol' },
  { minWidth: 82, field: 'price', headerName: 'Price' },
  { minWidth: 48, field: 'treatStat', headerName: 'Treat Stat' },
  { minWidth: 48, field: 'treatTime', headerName: 'Treat Time' },
  { minWidth: 80, field: 'memo', headerName: 'Memo' },
  { minWidth: 20, field: 'addressTag', headerName: 'Address Tag' },
  { minWidth: 20, field: 'txid', headerName: 'TXID' },
];

const WithdrawTable = () => {
  const services = useService();
  const { coin, dateRange } = useOutletContext<WalletOutletContext>();

  const { withdrawHistory, getWithdrawHistory } =
    services.wallet.getWithdrawHistory();

  useEffect(() => {
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);

    getWithdrawHistory(coin, startDate, endDate);
  }, [dateRange, coin]);

  return (
    <WithdrawTableStyle>
      <div className="box">
        <span className="label">Withdraw History</span>
        <div className="table-cont">
          <DataGrid
            rows={withdrawHistory}
            columns={withdrawColumns}
            pageSize={25}
            // rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </WithdrawTableStyle>
  );
};

const WithdrawTableStyle = styled.div`
  .box {
    padding: 20px 0;
    border-top: 1px solid rgb(225, 225, 225);
    .label {
      display: block;
      margin-top: 10px;
      margin-bottom: 15px;
      font-size: 15px;
      font-weight: bold;
      line-height: 20px;
    }
    .table-cont {
      width: 100%;
      height: 800px;
    }
  }
`;

export default WithdrawTable;
