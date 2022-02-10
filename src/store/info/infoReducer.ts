import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dark, light } from '@/assets/styles/theme';
import { DefaultTheme } from 'styled-components';
import { Route, ReduceRoute } from '@/types/Route';
interface StateType {
  routeInfo:
    | ReduceRoute
    | {
        path: null;
        element: null;
        meta: {
          theme: DefaultTheme;
          headerHide: boolean;
          footerHide: boolean;
          isAuth: boolean;
        };
      };
}

const initialState: StateType = {
  routeInfo: {
    path: null,
    element: null,
    meta: {
      theme: light,
      headerHide: false,
      footerHide: false,
      isAuth: false,
    },
  },
};

const infoSlice = createSlice({
  name: 'infoSlice',
  initialState,
  reducers: {
    setRouteInfo(state, action: PayloadAction<{ routeInfo: Route | null }>) {
      const { routeInfo } = action.payload;

      if (!routeInfo) return;

      const basicMeta = {
        theme: light,
        headerHide: false,
        footerHide: false,
        isAuth: false,
      };

      if (routeInfo.meta) {
        state.routeInfo.meta.theme =
          routeInfo.meta.theme === 'dark' ? dark : light;

        state.routeInfo.meta.headerHide = Boolean(routeInfo.meta.headerHide);
        state.routeInfo.meta.footerHide = Boolean(routeInfo.meta.footerHide);
        state.routeInfo.meta.isAuth = Boolean(routeInfo.meta.isAuth);
      } else {
        state.routeInfo.meta = basicMeta;
      }

      state.routeInfo = { ...routeInfo, meta: state.routeInfo.meta };
    },
  },
});

export const { setRouteInfo } = infoSlice.actions;

export default infoSlice.reducer;
