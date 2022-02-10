import {useTypedSelector} from '@/store';
import { ReduceRouteMeata } from '@/types/Route';

function useRouteMeta<T extends keyof ReduceRouteMeata>(metaName : T) : ReduceRouteMeata[T] {
    return useTypedSelector(state => state.infoReducer.routeInfo.meta[metaName], (a, b) => a === b);
}

export default useRouteMeta;