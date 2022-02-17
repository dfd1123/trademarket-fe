import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/assets/styles/global-styles';
import RouterView from '@/router';
import ModalContainer from '@/views/components/common/modal/ModalContainer';
import DialogContainer from '@/views/components/common/dialog/DialogContainer';
import ToastContainer from '@/views/components/common/toast/ToastContainer';
import useRouteMeta from '@/hooks/useRouteMeta';

function App() {
  const theme = useRouteMeta('theme');

  return (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterView />
        <ModalContainer />
        <DialogContainer />
        <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
