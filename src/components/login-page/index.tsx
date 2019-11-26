import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

import { withAuth } from '../../providers/auth';
import { AuthServiceInteface } from '../../services/auth';

import SC from './styled';

interface Props {
  authService: AuthServiceInteface;
}

class LoginPage extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.logOutAndRedirect = this.logOutAndRedirect.bind(this);
  }

  private async logOutAndRedirect(): Promise<void> {
    const { authService } = this.props;
    await authService.logOut(`${location.origin}/auth`);
  }

  public render(): JSX.Element | null {
    const { authService } = this.props;
    if (authService.isAuthorised()) {
      return <Redirect to='/' />;
    }
    return authService.isInstantiated() ? (
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
    ) : null;
  }
}

export default withAuth(LoginPage);
