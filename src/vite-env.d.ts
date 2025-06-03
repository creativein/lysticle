/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SITERELIC_API_URL: string;
  readonly VITE_SITERELIC_API_KEY: string;
  readonly VITE_ANSIBLE_API_URL: string;
  readonly VITE_ANSIBLE_USERNAME: string;
  readonly VITE_ANSIBLE_TOKEN: string;
  readonly VITE_REQUIRED_A_RECORD: string; // Add this line
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}