export interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_IS_DEV: boolean;
  readonly VITE_SHOW_DEVTOOLS: boolean;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
