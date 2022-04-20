import { useTypedSelector } from '@/store';

const useCoinList = () => {
  const coinList = useTypedSelector(
    (state) => Object.values(state.coinInfoSlice.symbols),
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  );

  const symbols = coinList.map(coin => coin.CUR_NO);

  return {coinList, symbols};
};

export default useCoinList;
