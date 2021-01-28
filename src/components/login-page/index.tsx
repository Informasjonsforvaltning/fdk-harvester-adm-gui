import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

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
      <h1>Access denied</h1>
      <p>
        Unfortunately, you do not have access to the resources you requested.
      </p>
      <p>You can log in with another user.</p>
      <SC.LoginButton
        type='button'
        variant='contained'
        onClick={logOutAndRedirect}
      >
        Log in
      </SC.LoginButton>
    </SC.LoginPage>
  );
};

export default compose<FC>(memo, withAuth)(LoginPage);
