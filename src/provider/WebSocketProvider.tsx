import React from "react";
import { batch, useDispatch } from "react-redux";
import { updatePriceData } from "@/store/realTime/realTimePrice";
import { updateAsyncData } from "@/store/asyncData/asyncData";
import { TransactionInputType } from "@/types/TransactionType";

export interface TrdWebSocket extends WebSocket {
  waitSendList: TransactionInputType[];
  connect: boolean;
  closed: boolean;
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
  const dispatch = useDispatch();

  if (!window.ws) {
    window.ws = new WebSocket(webSocketUrl) as TrdWebSocket;
    let ws = window.ws;
    ws.connect = false;
    ws.closed = false;
    ws.waitSendList = [];

    ws.onopen = () => {
      if (!ws) return;
      ws.connect = true;
      console.log("web socket Connected!", ws);
      ws.waitSendList.forEach((input) => {
        ws && ws.sendInput(input);
        ws.waitSendList.shift();
      });

      setInterval(() => ws.send("{'event':'ping'}"), 50000);
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log("web socket 커넥션 종료됨");
      } else {
        console.log("web socket 커넥션 error", event);
      }
    };

    ws.onmessage = ({ data }: { data: MessageEvent["data"] }): undefined => {
      data = JSON.parse(data);
      const trcode = data.Header.trcode;

      if(trcode === '00000') return;

      batch(() => {
        switch (trcode) {
          case "91":
            return dispatch(updatePriceData(data));
          default:
            return dispatch(updateAsyncData(data));
        }
      });
    };

    ws.sendInput = (input: TransactionInputType) => {
      if (!ws) return;
      else if (!ws.connect) ws.waitSendList.push(input);
      else ws.send(JSON.stringify(input));
    };

    ws.onerror = (error) => {
      console.error("Socket error in WebSocketProvider: ", error);
    };
  }

  return (
    <WebSocketContext.Provider value={window.ws}>
      {children}
    </WebSocketContext.Provider>
  );
}
