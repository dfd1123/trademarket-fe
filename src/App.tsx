import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { dark, light } from "@/assets/styles/theme";
import { ThemeProvider } from "styled-components";
import WebSocketProvider from "@/provider/WebSocketProvider";
import GlobalStyle from "@/assets/styles/global-styles";
import RouterView from "@/router";
import Header from "@/views/components/layouts/Header";
import ModalProvider from "@/provider/ModalProvider";
import ModalContainer from "@/views/components/common/modal/ModalContainer";

function App() {
  const { pathname } = useLocation();
  const whiteThemeList = ["/test1"];

  return (
    <ThemeProvider theme={whiteThemeList.includes(pathname) ? light : dark}>
      <GlobalStyle />
      <ModalProvider>
        <Header theme={whiteThemeList.includes(pathname) ? light : dark} />
        <RouterView />
        <ModalContainer />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
