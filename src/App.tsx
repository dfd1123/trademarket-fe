import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import { dark, light } from "@/assets/styles/theme";
import { ThemeProvider } from 'styled-components';
import WebSocketProvider from '@/provider/WebSocketProvider';
import GlobalStyle from "@/assets/styles/global-styles";
import RouterView from '@/router';
import Header from '@/views/components/layouts/Header';

function App() {

  const {pathname} = useLocation();
  const whiteThemeList = ['/test1'];
  const [theme, setTheme] = useState(whiteThemeList.includes(pathname) ? light : dark);

  useEffect(() => {
    setTheme(whiteThemeList.includes(pathname) ? light : dark);
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header theme={theme} />
      <RouterView />
    </ThemeProvider>
  )
}

export default App
