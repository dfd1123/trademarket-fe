import {TrdWebSocket} from '@/provider/WebSocketProvider';
import { TransactionInputType } from '@/types/TransactionType';
export {};

declare global {
    interface Window {
        ws?: TrdWebSocket;
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