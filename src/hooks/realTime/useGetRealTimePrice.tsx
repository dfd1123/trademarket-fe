import {useContext, useEffect} from 'react';
import { useTypedSelector } from '@/store';
import {getRealTimePrice} from '@/store/realTime/realTimePrice';
import { RealTimePriceState } from '@/store/realTime/types/realTimePrice';

const useGetRealTimePrice = (symbol: keyof RealTimePriceState, equalityFn?: (left: unknown, right: unknown) => boolean) => {
    return useTypedSelector(getRealTimePrice(symbol), equalityFn);
}

export default useGetRealTimePrice;