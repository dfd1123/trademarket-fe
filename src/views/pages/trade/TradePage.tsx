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
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import TradeTables from '@/views/components/trade/tradeTables/TradeTables';
import MarginDetail from '@/views/components/trade/marginDetail/MarginDetail';

const TradePage = () => {
  const services = useService();
  services.realTime.coinPrice();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1180);

  const handleSize = _debounce(function () {
    setIsMobile(window.innerWidth < 1180);
  }, 800);

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
        <div className="history-pannel-cont">
          <TradeTables />
          <MarginDetail mobile={isMobile} />
        </div>
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

  .history-pannel-cont{
    margin: 5px 0; 
    overflow:hidden;
    >div{
      float:left;
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    .chart-line {
      display:none;
    }
  }
`;

export default TradePage;
