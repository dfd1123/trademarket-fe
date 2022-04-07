import { useEffect, useState } from 'react';
import styled from 'styled-components';
import _debounce from 'lodash/debounce';
import TradeCoinInfoHd from '@/views/components/trade/TradeCoinInfoHd';
import TradeInfoProvider from '@/provider/TradeInfoProvider';
import useService from '@/hooks/useService';
import Chart from '@/views/components/trade/chart/Chart';
import OrderNTrade from '@/views/components/trade/orderNtrade/OrderNTrade';
import OrderBox from '@/views/components/trade/orderBox/OrderBox';
import MobileChartLine from '@/views/components/trade/mobile/MobileChartLine';

const TradePage = () => {
  const services = useService();
  services.realTime.coinPrice();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1180);

  const handleSize = _debounce(function () {
    console.log('awdadw');
    setIsMobile(window.innerWidth < 1180);
  }, 200);

  useEffect(() => {
    window.addEventListener('resize', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return (
    <TradePageStyle>
      <TradeInfoProvider>
        <TradeCoinInfoHd />
        {isMobile ? (
          <MobileChartLine />
        ) : (
          <div className="chart-line">
            <Chart />
            <OrderNTrade />
            <OrderBox />
          </div>
        )}
      </TradeInfoProvider>
    </TradePageStyle>
  );
};

const TradePageStyle = styled.div`
  .chart-line {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }
`;

export default TradePage;
