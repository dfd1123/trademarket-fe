import {useTypedSelector} from '@/store';

const useRouteInfo = () => {
    return useTypedSelector(state => state.infoReducer.routeInfo, (a, b) => !a || !b || a?.path === b?.path);
}

export default useRouteInfo;