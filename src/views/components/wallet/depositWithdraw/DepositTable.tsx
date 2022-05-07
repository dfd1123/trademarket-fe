import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useService from "@/hooks/useService";
import { WalletOutletContext } from "@/views/pages/wallet/Wallet";
import { useOutletContext } from "react-router";

const depositColumns: GridColDef[] = [
  { field: "id", hide: true },
  { minWidth: 180, field: "date", headerName: "Date" },
  { minWidth: 96, field: "coin", headerName: "Coin" },
  { minWidth: 200, field: "amount", headerName: "Amount" },
  { minWidth: 540, field: "tx", headerName: "Tx" },
  { minWidth: 340, field: "condition", headerName: "Condition" },
];

const DepositTable = () => {
  const services = useService();
  const { coin, dateRange } = useOutletContext<WalletOutletContext>();

  const {depositHistory, getDepositHistory} = services.wallet.getDepositHistory();

  useEffect(() => {
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);

    getDepositHistory(coin, startDate, endDate);
  }, [dateRange, coin]);
  
  return (
    <DepositTableStyle>
      <div className="box">
        <span className="label">QR Code</span>
        <div className="table-cont">
          <DataGrid
            rows={depositHistory}
            columns={depositColumns}
            pageSize={25}
            // rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </DepositTableStyle>
  );
};

const DepositTableStyle = styled.div`
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

export default DepositTable;
