import { validateEnv } from './utils/commons';

import { Environment } from './types/enums';

export default validateEnv(
  (window as any).env ?? {
    ENV: Environment.DEVELOPMENT,
    OIDC_ISSUER:
      'https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk',
    FDK_BASE_URI: 'https://staging.fellesdatakatalog.digdir.no',
    FDK_HARVEST_ADMIN_HOST:
      'https://admin-api.staging.fellesdatakatalog.digdir.no',
    FDK_REGISTRATION_BASE_URI:
      'https://registrering.fellesdatakatalog.digdir.no',
    ORGANISATION_CATALOGUE_HOST:
      'https://organization-catalogue.staging.fellesdatakatalog.digdir.no'
  }
);
