import common from '@/router/common';
import auth from '@/router/auth';
import trade from '@/router/trade';
import wallet from '@/router/wallet';
import tradeHistory from './tradeHistory';
import helpCenter from '@/router/helpCenter';
import { setRouteInfo } from '@/store/info/infoReducer';
import { Route, RouteMeta } from '@/types/Route';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
import NotFound from '@/views/pages/NotFound';
import useService from '@/hooks/useService';

const routeList: Route[] = [
  ...common,
  ...auth,
  ...trade,
  ...helpCenter,
  ...wallet,
  ...tradeHistory,
];

export default function RouterView() {
  const dispatch = useDispatch();
  const services = useService();
  services.coinInfo.reqAllCoinInfo();

  /**
   * @description route middleware 함수이며 각 route module에서
   * import 해온 배열 정보 중 meta 필드를 확인하는 방식으로 작동
   */
  const middleware = (routes: Route[]) => {
    return routes
      .reduce((prev, curr) => {
        if (curr.children) {
          // const children = curr.children.map(route => ({...route, path: `${curr.path}/${route.path}`}))
          return [...prev, curr, ...curr.children];
        }
        return [...prev, curr];
      }, [] as Route[])
      .map((route) => {
        let newElement = route.element;
        if (route.meta) {
          const { authSlice } = JSON.parse(
            localStorage.getItem('persist:elpist') || '{}'
          );
          
          const { isLoggedIn } = JSON.parse(authSlice || '{}');

          if (route.meta.isAuth) {
            if (!isLoggedIn) newElement = <Navigate to="/login" />;
          
          }
        }
        return { ...route, element: newElement };
      });
  };

  /**
   * @description 현재 routing될 컴포넌트의 route 정보를 추출하여 {routeInfo, ,meta} 형식으로 반환
   */
  const getCurrentRouteInfo = (
    currentComponent: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    > | null
  ): { routeInfo: Route | null; meta: RouteMeta } => {
    if (!currentComponent) return { routeInfo: null, meta: {} };
    const routeInfo = routes.find((route) => {
      let lastIndex = 0;
      if (currentComponent.props.value.outlet) {
        lastIndex =
          currentComponent.props.value.outlet.props.value.matches.length - 1;
        return (
          currentComponent.props.value.outlet.props.value.matches[lastIndex]
            .route.path === route.path
        );
      } else {
        lastIndex = currentComponent.props.value.matches.length - 1;
        return (
          currentComponent.props.value.matches[lastIndex].route.path ===
          route.path
        );
      }
    });

    return { routeInfo: routeInfo ?? null, meta: routeInfo?.meta ?? {} };
  };

  /**
   * @description middleware 검증 후 route 배열 정보를 routes 변수에 저장
   */
  const routes = middleware(routeList);

  /**
   * @description useRoutes 훅을 사용하여 현재 routing 될 컴포넌트 정보를 routing 변수에 저장
   */
  const routing = useRoutes([...routes, { path: '*', element: <NotFound /> }]);

  const { routeInfo, meta } = getCurrentRouteInfo(routing);

  /**
   * @description 현재 라우팅 되는 route 정보를 redux에 mutate
   */

  useEffect(() => {
    dispatch(setRouteInfo({ routeInfo }));
  }, [routeInfo]);

  const headerHide = meta.headerHide ? "hide-header" : "";
  const footerHide = meta.headerHide ? "hide-footer" : "";
  const theme = meta.theme ?? "light";

  return (
    <div id={`wrapper`} className={`${headerHide} ${footerHide} ${theme}`}>
      {routing}
    </div>
  );
}
