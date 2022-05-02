import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useService from '@/hooks/useService';
import Tab from '@/views/components/common/tab/Tab';
import WalletHistoryList from '@/views/components/wallet/history/WalletHistoryList';
import NoData from '@/views/components/common/NoData';
import { MOBILE_SIZE } from '@/assets/styles/responsiveBreakPoint';
import { useOutletContext } from 'react-router';
import { WalletOutletContext } from '@/views/pages/wallet/Wallet';

const WalletHistory = () => {
  const services = useService();
  const { loading, noData, walletHistory, getWalletHistory } =
    services.wallet.getWalletHistory();
  const { coin, dateRange } = useOutletContext<WalletOutletContext>();

  const [tabIndex, setTabIndex] = useState(0);

  const convertTab = useMemo(
    () => (tabIndex === 0 ? '079' : '081'),
    [tabIndex]
  );
  const historyList = useMemo(
    () => walletHistory.filter((row) => row.side === convertTab),
    [convertTab, walletHistory]
  );

  useEffect(() => {
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);

    getWalletHistory(coin, startDate, endDate);
  }, [coin, dateRange]);

  return (
    <WalletHistoryStyle>
      <h4 className="sub-tit">Deposit and Withdraw History</h4>
      <Tab
        list={['Deposit', 'Withdraw']}
        ripple={false}
        onChange={setTabIndex}
      />
      {!loading &&
        (noData ? (
          <NoData msg="No data was retrieved" />
        ) : (
          <div className="history-table">
            {historyList.map((row, idx) => (
              <WalletHistoryList key={`${row.symbol}-${idx}`} info={row} />
            ))}
          </div>
        ))}
    </WalletHistoryStyle>
  );
};

const WalletHistoryStyle = styled.div`
  .history-table {
  }

  @media (max-width: ${MOBILE_SIZE}) {
    .history-table {
    }
  }
`;

export default WalletHistory;
