import styled from 'styled-components';
import TradeCoinInfoHd from '@/views/components/trade/TradeCoinInfoHd';
import TradeInfoProvider from '@/provider/TradeInfoProvider';
import useService from '@/hooks/useService';
import Chart from '@/views/components/trade/chart/Chart';

const TradePage = () => {
  const services = useService();
  services.realTime.coinPrice();

  return (
    <TradePageStyle>
      <TradeInfoProvider>
        <TradeCoinInfoHd />
        <Chart />
      </TradeInfoProvider>
    </TradePageStyle>
  );
};

const TradePageStyle = styled.div``;

export default TradePage;
