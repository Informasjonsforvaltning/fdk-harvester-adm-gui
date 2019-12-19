import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

import { withAuth } from '../../providers/auth';

import SC from './styled';
import { Auth } from '../../lib/auth/auth';

interface Props {
  authService: Auth;
}

class LoginPage extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.logOutAndRedirect = this.logOutAndRedirect.bind(this);
  }

  private async logOutAndRedirect(): Promise<void> {
    const { authService } = this.props;
    await authService.logout();
  }

  public render(): JSX.Element | null {
    const { authService } = this.props;
    if (authService.hasSystemAdminPermission()) {
      return <Redirect to='/' />;
    }
    return (
      <SC.LoginPage>
        <h1>Access denied</h1>
        <p>
          Unfortunately, you do not have access to the resources you requested.
        </p>
        <p>You can log in with another user.</p>
        <SC.LoginButton
          type='button'
          variant='contained'
          onClick={this.logOutAndRedirect}
        >
          Log in
        </SC.LoginButton>
      </SC.LoginPage>
    );
  }
}

export default withAuth(LoginPage);
