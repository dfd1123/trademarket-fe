import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import RouterView from '@/router';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from "@/assets/styles/global-styles";
import { white, black } from "@/assets/styles/theme";
import WebSocketProvider from '@/provider/WebSocketProvider';

function App() {

  const {pathname} = useLocation();
  const whiteThemeList = ['/test1'];
  const [theme, setTheme] = useState(whiteThemeList.includes(pathname) ? white : black);

  useEffect(() => {
    setTheme(whiteThemeList.includes(pathname) ? white : black);
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterView />
    </ThemeProvider>
  )
}

export default App
