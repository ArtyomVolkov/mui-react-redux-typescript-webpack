declare module '*.png';
declare module '*.jpg';
declare module '*.svg';

interface Window {
  _env_: {
    NODE_ENV?: string,
    REST_API?: string,
    POLICY: string,
    TENANT: string,
    OM_CLIENT_ID: string,
    CLIENT_ID: string,
  }
}
