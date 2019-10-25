import { Configuration } from './types';

interface EnvironmentVariables {
  OIDC_ISSUER: string;
  OIDC_CLIENT_ID: string;
  FDK_HARVEST_ADMIN_HOST: string;
}

const env = ((window as any).env || {
  OIDC_ISSUER: 'http://localhost:8084/auth/realms/fdk',
  OIDC_CLIENT_ID: 'fdk-admin-gui',
  FDK_HARVEST_ADMIN_HOST: 'http://localhost:8134'
}) as EnvironmentVariables;

export default { ...env } as Configuration;
