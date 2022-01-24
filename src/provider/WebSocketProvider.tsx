import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePriceData } from '@/store/realTime/realTimePrice';
import { TransactionInputType } from '@/types/TransactionType';

export interface TrdWebSocket extends WebSocket {
  waitSendList: TransactionInputType[];
  connect: boolean;
  sendInput: (input: TransactionInputType) => undefined | void;
}

const WebSocketContext = React.createContext<any>(window.ws || {sendInput:(input: TransactionInputType) => { window.location.reload(); }});
export { WebSocketContext };

export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const webSocketUrl = process.env.WS_HOST;
  const dispatch = useDispatch();

  if (!window.ws) {
    window.ws = new WebSocket(webSocketUrl) as TrdWebSocket;
    const ws = window.ws;
    ws.connect = false;
    ws.waitSendList = [];

    ws.onopen = () => {
      if (!ws) return;
      ws.connect = true;
      console.log('web socket Connected!', ws);
      ws.waitSendList.forEach((input) => ws && ws.sendInput(input));
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log('web socket 커넥션 종료됨');
      } else {
        console.log('web socket 커넥션 error', event);
      }
    };

    ws.onmessage = ({ data }: { data: MessageEvent['data'] }): any => {
      data = JSON.parse(data);

      switch (data.Header.trcode) {
        case '91':
          return dispatch(updatePriceData(data));
      }
    };

    ws.sendInput = (input: TransactionInputType) => {
      if (!ws) return;
      else if (!ws.connect) ws.waitSendList.push(input);
      else ws.send(JSON.stringify(input));
    };

    ws.onerror = (error) => {
      console.error('Socket error in WebSocketProvider: ', error);
    };
  }

  return (
    <WebSocketContext.Provider value={window.ws}>
      {children}
    </WebSocketContext.Provider>
  );
}
