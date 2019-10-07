import { UserManagerSettings } from 'oidc-client';

import env from '../../env';

const { OIDC_ISSUER, OIDC_CLIENT_ID } = env;

const userManagerSettings: UserManagerSettings = {
  authority: OIDC_ISSUER,
  client_id: OIDC_CLIENT_ID,
  redirect_uri: `${location.origin}/auth`,
  response_type: 'code',
  revokeAccessTokenOnSignout: true
};

export default userManagerSettings;
