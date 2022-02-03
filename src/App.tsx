import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { dark, light } from '@/assets/styles/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/assets/styles/global-styles';
import RouterView from '@/router';
import Header from '@/views/components/layouts/Header';
import Footer from '@/views/components/layouts/Footer';
import ModalContainer from '@/views/components/common/modal/ModalContainer';

function App() {
  const { pathname } = useLocation();
  const whiteThemeList = ['/test1'];

  return (
    <ThemeProvider theme={whiteThemeList.includes(pathname) ? light : dark}>
      <GlobalStyle />
      <Header theme={whiteThemeList.includes(pathname) ? light : dark} />
      <RouterView />
      <Footer />
      <ModalContainer />
    </ThemeProvider>
  );
}

export default App;
