import { useTypedSelector } from '@/store';
import {getRealTimePrice} from '@/store/realTime/realTimeData';
import { RealTimeDataState } from '@/store/realTime/types/realTimeData';

const useGetRealTimePrice = (symbol: string, equalityFn?: (left: unknown, right: unknown) => boolean) => {
    return useTypedSelector(getRealTimePrice(symbol), equalityFn);
}

export default useGetRealTimePrice;