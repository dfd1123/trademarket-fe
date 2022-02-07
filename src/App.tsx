import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { dark, light } from '@/assets/styles/theme';
import {useTypedSelector} from '@/store';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/assets/styles/global-styles';
import RouterView from '@/router';
import Header from '@/views/components/layouts/Header';
import Footer from '@/views/components/layouts/Footer';
import ModalContainer from '@/views/components/common/modal/ModalContainer';

function App() {
  const theme = useTypedSelector(state => state.infoReducer.theme, (a, b) => {
    return a.name === b.name
  });

  const headerHide = useTypedSelector(state => state.infoReducer.headerHide, (a, b) => {
    return a === b
  });

  const footerHide = useTypedSelector(state => state.infoReducer.footerHide, (a, b) => {
    return a === b
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {headerHide ? '' : <Header theme={theme} />}
      <RouterView />
      {footerHide ? '' : <Footer />}
      <Footer />
      <ModalContainer />
    </ThemeProvider>
  );
}

export default App;
