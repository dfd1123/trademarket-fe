/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL?: string;
  readonly VITE_APP_TITLE?: string;
  readonly WS_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
