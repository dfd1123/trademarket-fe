import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import theme from '@/assets/styles/theme';
import { DefaultTheme } from 'styled-components';
import { Route, ReduceRoute } from '@/types/Route';
interface StateType {
  loading: boolean;
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
  loading: false,
  routeInfo: {
    path: null,
    element: null,
    meta: {
      theme: theme.light,
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
    setLoadingStatus(state, action: PayloadAction<{status: boolean}>){
      state.loading = action.payload.status;
    },
    setRouteInfo(state, action: PayloadAction<{ routeInfo: Route | null }>) {
      const { routeInfo } = action.payload;

      if (!routeInfo) return;

      const basicMeta = {
        theme: theme.light,
        headerHide: false,
        footerHide: false,
        isAuth: false,
      };

      if (routeInfo.meta) {
        const themeName = routeInfo.meta.theme || 'dark';
        state.routeInfo.meta.theme = theme[themeName];

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

export const { setLoadingStatus, setRouteInfo } = infoSlice.actions;

export default infoSlice.reducer;
