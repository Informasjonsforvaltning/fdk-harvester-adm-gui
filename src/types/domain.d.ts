import type { DataType, Standard, MimeType } from './enums';

export interface DataSource {
  id: string;
  dataType: DataType | null;
  dataSourceType: Standard | null;
  url: string;
  publisherId: string;
  description: string;
  acceptHeaderValue: MimeType | null;
  authHeader: AuthHeader | null;
}

export interface Delegatee {
  id: string;
  name: string;
}

export interface Organization {
  organizationId: string;
  name: string;
}

export interface Filter {
  publisherSearch?: string;
  dataType?: DataType;
}

export type SnackbarVariant = 'harvest:success' | 'harvest:error';
