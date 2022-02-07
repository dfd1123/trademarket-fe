export interface RouteMeta {
  theme?: string;
    headerHide?: boolean;
    footerHide?: boolean;
}
export interface Route {
  path: string;
  element: JSX.Element;
  isAuth?: boolean;
  meta?:RouteMeta
}
