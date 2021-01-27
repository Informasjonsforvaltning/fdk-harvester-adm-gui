import type { Environment } from './enums';

export interface EnvironmentVariables {
  ENV: Environment;
  OIDC_ISSUER: string;
  FDK_HARVEST_ADMIN_HOST: string;
  ORGANISATION_CATALOGUE_HOST: string;
}
