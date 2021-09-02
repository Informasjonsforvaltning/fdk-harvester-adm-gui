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
      'https://registrering.staging.fellesdatakatalog.digdir.no',
    ORGANIZATION_CATALOGUE_HOST:
      'https://organization-catalogue.staging.fellesdatakatalog.digdir.no',
    FDK_CMS_BASE_URI: 'https://cms.fellesdatakatalog.digdir.no'
  }
);
