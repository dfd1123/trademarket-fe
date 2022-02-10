import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/assets/styles/global-styles';
import {dark} from '@/assets/styles/theme';
import RouterView from '@/router';
import Header from '@/views/components/layouts/Header';
import Footer from '@/views/components/layouts/Footer';
import ModalContainer from '@/views/components/common/modal/ModalContainer';
import useRouteInfo from '@/hooks/useRouteInfo';
import useRouteMeta from './hooks/useRouteMeta';

function App() {
//   const {meta} = {
//     meta: {
//       footerHide: false,
// headerHide: true,
// theme:{
//   basicWidth: "320px",
//   color: {main: '#FFF', sub: '#000'},
//   header: {color: '#000'},
//   name: "light"
// }
//     }
//   };
  const theme = useRouteMeta('theme');
  // console.log(meta);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header theme={theme} />
      <RouterView />
      <Footer />
      <Footer />
      <ModalContainer />
    </ThemeProvider>
  );
}

export default App;
