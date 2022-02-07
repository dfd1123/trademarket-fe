import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dark, light } from '@/assets/styles/theme';
import { DefaultTheme } from 'styled-components';
import { Route } from "@/types/Route";

const initialState: {theme: DefaultTheme, headerHide: boolean, footerHide: boolean, routeInfo: Route | null} = {
  theme: dark,
  headerHide: false,
  footerHide: false,
  routeInfo: null
};

const infoSlice = createSlice({
  name: 'infoSlice',
  initialState,
  reducers: {
    headerHide(state, action: PayloadAction<{headerHide: boolean}>){
      const {headerHide} = action.payload;
      state.headerHide = headerHide;
    },
    footerHide(state, action: PayloadAction<{footerHide: boolean}>){
      const {footerHide} = action.payload;
      state.headerHide = footerHide;
    },
    changeTheme(state, action: PayloadAction<{theme: DefaultTheme}>) {
        const {theme} = action.payload;
        state.theme = theme;
    },
    setRouteInfo(state, action : PayloadAction<{routeInfo: Route}>){
      const {routeInfo} = action.payload;

      let theme = light;
      let headerHide = false;
      let footerHide = false;

      if(routeInfo.meta){
        theme = routeInfo.meta.theme === 'dark' ? dark : light;
        headerHide = Boolean(routeInfo.meta.headerHide);
        footerHide =  Boolean(routeInfo.meta.footerHide);
      }

      state.routeInfo = routeInfo;
      state.theme = theme;
      state.headerHide = headerHide;
      state.footerHide = footerHide;
    }
  },
});

export const { changeTheme, headerHide, footerHide, setRouteInfo } = infoSlice.actions;

export default infoSlice.reducer;
