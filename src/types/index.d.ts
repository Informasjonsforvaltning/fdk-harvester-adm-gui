export interface Configuration {
  OIDC_ISSUER: string;
  FDK_HARVEST_ADMIN_HOST: string;
  ORGANISATION_CATALOGUE_HOST: string;
}

export interface DataSource {
  id: string;
  dataSourceType: string;
  url: string;
  publisherId: string;
  description: string;
  acceptHeaderValue: string;
}

export interface Delegatee {
  id: string;
  name: string;
}

export * from './common';
