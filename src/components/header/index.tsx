import React, { memo, FC } from 'react';
import { compose } from 'redux';
import InternalHeader from '@fellesdatakatalog/internal-header';
import Link from '@fellesdatakatalog/link';

import { withAuth } from '../../providers/auth';
import { Auth } from '../../lib/auth/auth';

import env from '../../env';

interface Props {
  authService: Auth;
}

const { FDK_BASE_URI, FDK_REGISTRATION_BASE_URI, FDK_HARVEST_ADMIN_HOST } = env;

const Header: FC<Props> = ({ authService }) => {
  const logOutAndRedirect = async () => authService.logout();

  return (
    <InternalHeader
      username={authService.getUser()?.name}
      onLogout={logOutAndRedirect}
    >
      <Link href={FDK_REGISTRATION_BASE_URI}>Registrere data</Link>
      <Link href={FDK_HARVEST_ADMIN_HOST}>Høste data</Link>
      <Link href={FDK_BASE_URI} external>
        Søk i Felles datakatalog
      </Link>
    </InternalHeader>
  );
};

export default compose<FC>(memo, withAuth)(Header);
