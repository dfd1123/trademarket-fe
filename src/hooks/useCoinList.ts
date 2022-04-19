import { useTypedSelector } from '@/store';

const useCoinList = () => {
  const coinList = useTypedSelector(
    (state) => Object.values(state.coinInfoSlice.symbols),
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  );
  console.log('awdawdad');
  const symbols = coinList.map(coin => coin.CUR_NO);

  return {coinList, symbols};
};

export default useCoinList;
