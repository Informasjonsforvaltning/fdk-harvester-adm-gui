import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { withAuth } from '../../providers/auth';
import { Auth } from '../../lib/auth/auth';

interface Props {
  disabled?: boolean;
  authService: Auth;
}

class ProtectedRoute extends PureComponent<Props> {
  public render(): JSX.Element {
    const { authService, disabled } = this.props;

    return !disabled &&
      (authService.hasSystemAdminPermission() ||
        authService.hasOrganizationAdminPermissions()) ? (
      <Route {...this.props} />
    ) : (
      <Redirect to='/login' />
    );
  }
}

export default withAuth(ProtectedRoute);
