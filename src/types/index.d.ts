export interface Configuration {
  OIDC_ISSUER: string;
  OIDC_CLIENT_ID: string;
  FDK_HARVEST_ADMIN_HOST: string;
}

export interface DataSource {
  id: string;
  dataSourceType: string;
  url: string;
  publisherId: string;
  description: string;
  acceptHeaderValue: string;
}

export * from './common';
