import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { withAuth } from '../../providers/auth';
import { Auth } from '../../lib/auth/auth';

interface ExternalProps extends RouteProps {
  disabled?: boolean;
}

interface Props extends ExternalProps {
  authService: Auth;
}

const ProtectedRoute: FC<Props> = ({ disabled, authService, ...props }) =>
  !disabled &&
  (authService.hasSystemAdminPermission() ||
    authService.hasOrganizationWritePermissions()) ? (
    <Route {...props} />
  ) : (
    <Redirect to='/login' />
  );

export default compose<FC<ExternalProps>>(memo, withAuth)(ProtectedRoute);
