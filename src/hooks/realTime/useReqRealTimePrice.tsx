import {useContext, useEffect} from 'react';
import {WebSocketContext} from '@/provider/WebSocketProvider';
import { TransactionInputType } from '@/types/TransactionType';


const useReqRealTimePrice = () => {
    const ws = useContext(WebSocketContext);
    const input : TransactionInputType = {
        Header: {
            function: 'A',
            termtype: 'HTS',
            trcode: '91',
          },
          Input1: {
            Key1: "BTCUSDT",
            Key2: "ETHUSDT",
            Key3: "XRPUSDT",
            Key4: "DOGEUSDT"
          },
    };

    const disConnectInput : TransactionInputType = {...input, Header: {...input.Header, function:'U'}};

    useEffect(() => {
        ws.sendInput(disConnectInput);
        setTimeout(() => {
            ws.sendInput(input);
        }, 5);

        return () => {
            ws.sendInput(disConnectInput);
        }
    }, []);
}

export default useReqRealTimePrice;