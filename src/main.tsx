import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import WebSocketProvider from '@/provider/WebSocketProvider';
import { Provider } from 'react-redux';
import store from '@/store';
import App from '@/App'

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
        <WebSocketProvider>
          <App />
        </WebSocketProvider>
        </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
