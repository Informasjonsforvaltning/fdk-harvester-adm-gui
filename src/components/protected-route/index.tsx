import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { withAuth } from '../../providers/auth';
import { Auth } from '../../lib/auth/auth';

interface Props {
  authService: Auth;
}

class ProtectedRoute extends PureComponent<Props> {
  public render(): JSX.Element {
    const { authService } = this.props;
    return authService.hasSystemAdminPermission() ||
      authService.hasOrganizationAdminPermissions() ? (
      <Route {...this.props} />
    ) : (
      <Redirect to='/login' />
    );
  }
}

export default withAuth(ProtectedRoute);
