/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly MODE?: string;
  readonly BASE_URL?: string;
  readonly PROD?: boolean;
  readonly DEV?: boolean;
}
