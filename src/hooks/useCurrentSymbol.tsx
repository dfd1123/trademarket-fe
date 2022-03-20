import { useTypedSelector } from '@/store';
import { formatNumber } from '@/utils/numberUtils';

const useCurrentSymbol = (symbol: string) => {
  const { PIP_LOWEST, MAX_ORDCNT } = useTypedSelector(
    (state) => state.coinInfoSlice.symbols[symbol] || {}
  );
  const coin = useTypedSelector((state) => state.realTimePrice[symbol]);

  if (!coin) return {};

  const pipLowest = PIP_LOWEST ?? 2;

  const getChangePerc = () => {
    if (isNaN(Number(coin.szPreClose))) {
      return '0.00';
    } else {
      return (
        ((Number(coin.szClose) - Number(coin.szPreClose)) /
          Number(coin.szPreClose)) *
        100
      ).toFixed(2);
    }
  };

  const close = formatNumber(Number(coin.szClose), pipLowest);
  const volume = coin.szVolume;
  const curNo = coin.szSymbol;
  const szHigh = formatNumber(coin.szHigh, pipLowest);
  const szLow = formatNumber(coin.szLow, pipLowest);
  const preClose = formatNumber(Number(coin.szPreClose), pipLowest);
  const status = Number(coin.szPreClose) > Number(coin.szClose) ? 'down' : 'up';
  const changePerc = getChangePerc();
  const isUp = Number(changePerc) > 0;
  const maxOrderCount = MAX_ORDCNT;

  return {
    close,
    szHigh,
    szLow,
    volume,
    curNo,
    preClose,
    status,
    changePerc,
    isUp,
    maxOrderCount,
  };
};

export default useCurrentSymbol;