import styled from 'styled-components';
import TradeCoinInfoHd from '@/views/components/trade/TradeCoinInfoHd';
import TradeInfoProvider from '@/provider/TradeInfoProvider';
import useService from '@/hooks/useService';

const TradePage = () => {
  const services = useService();
  services.realTime.coinPrice();

  return (
    <TradePageStyle>
      <TradeInfoProvider>
        <TradeCoinInfoHd />
      </TradeInfoProvider>
    </TradePageStyle>
  );
};

const TradePageStyle = styled.div``;

export default TradePage;
