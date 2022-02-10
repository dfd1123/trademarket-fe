import { useRoutes, Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import user from '@/router/user';
import common from '@/router/common';
import { setRouteInfo } from "@/store/info/infoReducer";
import { Route, RouteMeta } from "@/types/Route";

export default function RouterView() {
  const dispatch = useDispatch();

  const middleware = (routes : Route[]) => {
    return routes.map(route => {
      let newElement = route.element;
      if(route.meta && route.meta.isAuth) {
        newElement = <Navigate to='/login' /> ;
      }
      return {...route, element: newElement};
    })
  };

  const getCurrentRouteInfo = (currentComponent : React.ReactElement<any, string | React.JSXElementConstructor<any>> | null) : {routeInfo: Route | null, meta: RouteMeta} => {
    if(!currentComponent) return {routeInfo: null, meta: {}};
    const routeInfo = routes.find(route => currentComponent.props.value.matches[0].route.path === route.path);

    return {routeInfo : routeInfo ?? null, meta: routeInfo?.meta ?? {}};
  }

  const routes = middleware([
    ...common,
    ...user,
  ]);

  const routing = useRoutes([
    ...routes,
    {path: '*', element: <Navigate to='/404' />},
  ]);

  const {routeInfo, meta} = getCurrentRouteInfo(routing);

  dispatch(setRouteInfo({routeInfo}));

  const headerHide = meta.headerHide ? 'hide-header' : '';
  const footerHide = meta.headerHide ? 'hide-footer' : '';

  return <div id={`wrapper`} className={`${headerHide} ${footerHide}`}>{routing}</div>;
}


