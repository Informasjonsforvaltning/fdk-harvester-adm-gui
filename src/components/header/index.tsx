import React, { PureComponent } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { withAuth } from '../../providers/auth';

import SC from './styled';
import { Auth } from '../../lib/auth/auth';

interface Props {
  authService: Auth;
}

class Header extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.logOutAndRedirect = this.logOutAndRedirect.bind(this);
  }

  private getUserName(): string | undefined {
    const { authService } = this.props;
    return authService.getUser()?.name;
  }

  private async logOutAndRedirect(): Promise<void> {
    const { authService } = this.props;
    await authService.logout();
  }

  public render(): JSX.Element {
    const userName = this.getUserName();
    return (
      <SC.Header>
        <SC.Logo />
        {userName && (
          <SC.UserAvatar>
            <AccountCircleIcon />
            <SC.UserName>{userName}</SC.UserName>
            <SC.LogoutButton
              variant='outlined'
              onClick={this.logOutAndRedirect}
            >
              Log out
            </SC.LogoutButton>
          </SC.UserAvatar>
        )}
      </SC.Header>
    );
  }
}

export default withAuth(Header);
