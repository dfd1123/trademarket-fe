export {};

declare global {
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