import { DefaultTheme } from "styled-components";

export interface RouteMeta {
  theme?: DefaultTheme | string;
  headerHide?: boolean;
  footerHide?: boolean;
  isAuth?: boolean;
}
export interface Route {
  path: string;
  element: JSX.Element;
  meta?: RouteMeta;
}

export interface ReduceRoute extends Route {
  meta: {
    theme: DefaultTheme;
    headerHide: boolean;
    footerHide: boolean;
    isAuth: boolean;
  };
}

export interface ReduceRouteMeata extends RouteMeta {
  theme: DefaultTheme;
  headerHide: boolean;
  footerHide: boolean;
  isAuth: boolean;
}