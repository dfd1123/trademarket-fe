import auth from '@/router/auth';
import businessInfo from "@/router/businessInfo";
import common from '@/router/common';
import referenceRoom from "@/router/referenceRoom";
import myPage from "@/router/myPage";
import commonInfo from "@/router/commonInfo";
import serviceInfo from "@/router/serviceInfo";
import manageProfile from "@/router/manageProfile";
import test from '@/router/test';
import cookieService from "@/services/CookieService";
import { setRouteInfo } from "@/store/info/infoReducer";
import { Route, RouteMeta } from "@/types/Route";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Navigate, useRoutes } from "react-router-dom";

const routeList : Route[] = [
    ...test,
    ...auth,
    ...common,
    ...businessInfo,
    ...referenceRoom,
    ...myPage,
    // 아래의 두 라우터는 같은 컴포넌트 입니다. props로 받을 내용에 따라 페이지만 분리해야 하는 페이지 컴포인데 일단 임시로 이렇게 해 두었습니다. 나중에 변경 예정입니다.
    ...commonInfo,
    ...serviceInfo,
    ...manageProfile,
];

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
        const accessToken = cookieService.getAccessToken();
        if(route.meta.isAuth && !accessToken) {
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
  const routes = middleware(routeList);

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


