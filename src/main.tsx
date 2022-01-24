import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from "@/assets/styles/global-styles";
import { black } from "@/assets/styles/theme";
import WebSocketProvider from '@/provider/WebSocketProvider';
import { Provider } from 'react-redux';
import store from '@/store';
import App from '@/App'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={black}>
      <GlobalStyle />
      <BrowserRouter>
        <Provider store={store}>
        <WebSocketProvider>
          <App />
        </WebSocketProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
