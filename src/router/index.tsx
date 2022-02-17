import { useRoutes, Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setRouteInfo } from "@/store/info/infoReducer";
import { Route, RouteMeta } from "@/types/Route";
import user from '@/router/user';
import common from '@/router/common';
import { useEffect } from "react";

export default function RouterView() {
  const dispatch = useDispatch();

  /**
   * @description route middleware 함수이며 각 route module에서 
   * import 해온 배열 정보 중 meta 필드를 확인하는 방식으로 작동
   */
  const middleware = (routes : Route[]) => {
    return routes.map(route => {
      let newElement = route.element;
      if(route.meta){
        if(route.meta.isAuth) {
          newElement = <Navigate to='/login' /> ;
        }
      }
      return {...route, element: newElement};
    })
  };

  /**
   * @description 현재 routing될 컴포넌트의 route 정보를 추출하여 {routeInfo, ,meta} 형식으로 반환
   */
  const getCurrentRouteInfo = (currentComponent : React.ReactElement<any, string | React.JSXElementConstructor<any>> | null) : {routeInfo: Route | null, meta: RouteMeta} => {
    if(!currentComponent) return {routeInfo: null, meta: {}};
    const routeInfo = routes.find(route => currentComponent.props.value.matches[0].route.path === route.path);

    return {routeInfo : routeInfo ?? null, meta: routeInfo?.meta ?? {}};
  }

  /**
   * @description middleware 검증 후 route 배열 정보를 routes 변수에 저장
   */
  const routes = middleware([
    ...common,
    ...user,
  ]);

  /**
   * @description useRoutes 훅을 사용하여 현재 routing 될 컴포넌트 정보를 routing 변수에 저장
   */
  const routing = useRoutes([
    ...routes,
    {path: '*', element: <Navigate to='/404' />},
  ]);

  const {routeInfo, meta} = getCurrentRouteInfo(routing);

  /**
   * @description 현재 라우팅 되는 route 정보를 redux에 mutate
   */

  useEffect(() => {
    dispatch(setRouteInfo({routeInfo}));
  }, []);

  const headerHide = meta.headerHide ? 'hide-header' : '';
  const footerHide = meta.headerHide ? 'hide-footer' : '';

  return <div id={`wrapper`} className={`${headerHide} ${footerHide}`}>{routing}</div>;
}


