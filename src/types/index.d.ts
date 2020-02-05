import { DataType, Standard, MimeType } from './enums';

export interface Configuration {
  OIDC_ISSUER: string;
  FDK_HARVEST_ADMIN_HOST: string;
  ORGANISATION_CATALOGUE_HOST: string;
}

export interface DataSource {
  id: string;
  dataType: DataType | null;
  dataSourceType: Standard | null;
  url: string;
  publisherId: string;
  description: string;
  acceptHeaderValue: MimeType | null;
}

export interface Delegatee {
  id: string;
  name: string;
}

export * from './common';
