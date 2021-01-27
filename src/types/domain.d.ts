import type { DataType, Standard, MimeType } from './enums';

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
