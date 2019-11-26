import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { withAuth } from '../../providers/auth';
import { AuthServiceInteface } from '../../services/auth';

interface Props {
  authService: AuthServiceInteface;
}

class ProtectedRoute extends PureComponent<Props> {
  public render(): JSX.Element {
    const { authService } = this.props;
    return authService.isAuthorised() ? (
      <Route {...this.props} />
    ) : (
      <Redirect to='/login' />
    );
  }
}

export default withAuth(ProtectedRoute);
