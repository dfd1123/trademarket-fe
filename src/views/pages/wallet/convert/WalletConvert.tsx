import React, { useState } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router';
import Tab from '@/views/components/common/tab/Tab';
import { WalletOutletContext } from '@/views/pages/wallet/Wallet';
import { LightSelectBox } from '@/views/components/common/input/SelectBox';
import TextInput from '@/views/components/common/input/TextInput';
import BasicButton from '@/views/components/common/Button';
import ConvertRequest from '@/views/components/wallet/convert/ConvertRequest';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const WalletConvert = () => {
  const list = [
    { name: 'BTC', value: 'BTC' },
    { name: 'ETH', value: 'ETH' },
    { name: 'USDT', value: 'USDT' },
    { name: 'XRP', value: 'XRP' },
  ];

  const { coin, dateRange } = useOutletContext<WalletOutletContext>();

  return (
    <WalletConvertStyle>
      <h4 className="sub-tit">Convert to Spot Wallet</h4>
      <div className="box-cont">
        <ConvertRequest />
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
      />
    </div>
      </div>
    </WalletConvertStyle>
  );
};

const WalletConvertStyle = styled.div`
  .box-cont {

  }
`;

export default WalletConvert;
