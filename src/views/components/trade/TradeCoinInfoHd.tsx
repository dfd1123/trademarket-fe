import styled from 'styled-components';
import SelectCoinBox from '@/views/components/trade/SelectCoinBox';
import ChangeMarginType from '@/views/components/trade/ChangeMarginType';
import CoinInfoPannel from '@/views/components/trade/CoinInfoPannel';
import { SMALL_MOBILE_SIZE, TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

interface PropsType {}

const TradeCoinInfoHd = ({}: PropsType) => {
  return (
    <TradeCoinInfoHdStyle>
      <SelectCoinBox />
      <ChangeMarginType />
      <CoinInfoPannel />
    </TradeCoinInfoHdStyle>
  );
};

const TradeCoinInfoHdStyle = styled.div`
  position: relative;
  min-height: 68px;
  margin-top: 10px;
  margin-bottom: 5px;
  padding: 14px 20px;
  background-color: rgb(30, 31, 35);

  > * {
    display: inline-block;
    vertical-align: middle;
  }

  @media (max-width: ${TABLET_SIZE}) {
    margin-top: 0;
    padding: 14px 10px;

    > * {
      display: block;
    }
  }

  @media (max-width: ${SMALL_MOBILE_SIZE}) {
    padding: 14px 10px 0;
  }
`;

export default TradeCoinInfoHd;
