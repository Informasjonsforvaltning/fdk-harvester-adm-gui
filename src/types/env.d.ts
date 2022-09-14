import type { Environment } from './enums';

export interface EnvironmentVariables {
  ENV: Environment;
  OIDC_ISSUER: string;
  FDK_BASE_URI: string;
  FDK_HARVEST_ADMIN_HOST: string;
  FDK_REGISTRATION_BASE_URI: string;
  ORGANIZATION_CATALOG_URI: string;
  FDK_CMS_BASE_URI: string;
  USE_DEMO_LOGO: boolean;
}
