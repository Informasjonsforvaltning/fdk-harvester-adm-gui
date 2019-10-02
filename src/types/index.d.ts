export interface Configuration {
  OIDC_ISSUER: string;
  OIDC_CLIENT_ID: string;
}

export interface DataSource {
  id: string;
  dataSourceType: string;
  url: string;
  publisher: string;
  description: string;
}

export * from './common';
