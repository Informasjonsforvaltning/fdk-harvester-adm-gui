import { Configuration } from './types';

interface EnvironmentVariables {
  OIDC_ISSUER: string;
  FDK_HARVEST_ADMIN_HOST: string;
  ORGANISATION_CATALOGUE_HOST: string;
}

const env = ((window as any).env || {
  OIDC_ISSUER:
    'https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk',
  FDK_HARVEST_ADMIN_HOST:
    'https://admin-api.staging.fellesdatakatalog.digdir.no',
  ORGANISATION_CATALOGUE_HOST:
    'https://organization-catalogue.staging.fellesdatakatalog.digdir.no'
}) as EnvironmentVariables;

export default { ...env } as Configuration;
