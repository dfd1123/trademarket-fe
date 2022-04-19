import React, { useRef } from 'react';
import { batch, useDispatch } from 'react-redux';
import {
  updateMyConclusion,
  updateMyNewOrder,
  updateMyStopLimitOrder,
  updateOrderData,
  updatePriceData,
} from '@/store/realTime/realTimeData';
import { updateAsyncData } from '@/store/asyncData/asyncData';
import { TransactionInputType } from '@/types/TransactionType';
import { updateCoinInfo } from '@/store/coinInfo/coinInfoSlice';

export interface TrdWebSocket extends WebSocket {
  waitSendList: TransactionInputType[];
  connect: boolean;
  closed: boolean;
  subscribe: TransactionInputType[];
  sendInput: (input: TransactionInputType) => undefined | void;
}

const WebSocketContext = React.createContext<
  | TrdWebSocket
  | { sendInput: (input: TransactionInputType) => undefined | void }
>(
  window.ws || {
    sendInput: (input: TransactionInputType) => {
      window.location.reload();
    },
  }
);
export { WebSocketContext };

export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const webSocketUrl = process.env.WS_HOST;
  const webSocket = useRef<TrdWebSocket | null>(null);
  const dispatch = useDispatch();

  if (!window.ws) {
    window.ws = new WebSocket(webSocketUrl) as TrdWebSocket;
    let ws = window.ws;
    webSocket.current = ws;
    ws.subscribe = [];
    ws.connect = false;
    ws.closed = false;
    ws.waitSendList = [];

    ws.onopen = () => {
      if (!ws) return;
      ws.connect = true;
      console.log('web socket Connected!', ws);
      ws.waitSendList.forEach((input, index) => {
        ws && ws.sendInput(input);
        if (ws.waitSendList.length === index + 1) ws.waitSendList = [];
      });

      setInterval(() => ws.send("{'event':'ping'}"), 50000);
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log('web socket 커넥션 종료됨');
      } else {
        if (ws.connect) window.location.reload();
        console.log('web socket 커넥션 error', event);
      }
    };

    ws.onmessage = ({ data }: { data: MessageEvent['data'] }): undefined => {
      data = JSON.parse(data);
      const { trcode } = data.Header;

      if (trcode === '00000') return;

      batch(() => {
        switch (trcode) {
          case '91':
            return dispatch(updatePriceData(data));
          case '92':
            return dispatch(updateOrderData(data));
          case '95':
            return dispatch(updateMyConclusion(data));
          case '96':
            return dispatch(updateMyNewOrder(data));
          case '98':
            return dispatch(updateMyStopLimitOrder(data));
          case 't5511':
            return dispatch(updateCoinInfo(data));
          default:
            return dispatch(updateAsyncData(data));
        }
      });
    };

    ws.sendInput = (input: TransactionInputType) => {
      if (!ws) return;

      if (!ws.connect) ws.waitSendList.push(input);
      else {
        const { trcode, function: func } = input.Header;
        const input1 = input.Input1;

        const findIndex = ws.subscribe.findIndex(
          (req) =>
            req.Header.trcode === trcode &&
            JSON.stringify(req.Input1) === JSON.stringify(input1)
        );

        if (func === 'A' || func === 'U') {
          if (func === 'A' && findIndex === -1) {
            ws.subscribe.push(input);
            ws.send(JSON.stringify(input));
          } else if (func === 'U' && findIndex !== -1) {
            ws.subscribe.splice(findIndex, 1);
            ws.send(JSON.stringify(input));
          }
        } else {
          ws.send(JSON.stringify(input));
        }
      }
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
