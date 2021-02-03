import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import Button, { Variant } from '@fellesdatakatalog/button';

import { withAuth } from '../../providers/auth';
import { Auth } from '../../lib/auth/auth';

import SC from './styled';

interface Props {
  authService: Auth;
}

const LoginPage: FC<Props> = ({ authService }) => {
  const logOutAndRedirect = async () => authService.logout();

  return authService.hasSystemAdminPermission() ? (
    <Redirect to='/' />
  ) : (
    <SC.LoginPage>
      <h1>Ikke tilgang</h1>
      <p>Beklager, du har ikke tilgang til denne siden.</p>
      <p>Prøv å logge på med en annen bruker.</p>
      <p />
      <Button variant={Variant.PRIMARY} onClick={logOutAndRedirect}>
        Logg på
      </Button>
    </SC.LoginPage>
  );
};

export default compose<FC>(memo, withAuth)(LoginPage);
