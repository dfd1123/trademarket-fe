import {TrdWebSocket} from '@/provider/WebSocketProvider';
import { TransactionInputType } from '@/types/TransactionType';
export {};

declare global {
    interface Window {
        ws?: TrdWebSocket;
        __TEMP_STORE__: any;
      }
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            VITE_BASE_URL: string;
            VITE_APP_TITLE: string;
            WS_HOST: string;
        }
        
        interface Process {
            env: ProcessEnv;
        }
    }
}