import React, { PureComponent } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { withAuth } from '../../providers/auth';
import { AuthServiceInteface, User } from '../../services/auth';

import SC from './styled';

interface Props {
  authService: AuthServiceInteface;
}

class Header extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.logOutAndRedirect = this.logOutAndRedirect.bind(this);
  }

  private getUserName(): string | null {
    const { authService } = this.props;
    const user: User | null = authService.getUser();
    return user ? user.profile.name : null;
  }

  private async logOutAndRedirect(): Promise<void> {
    const { authService } = this.props;
    await authService.logOut(`${location.origin}/auth`);
  }

  public render(): JSX.Element {
    const userName: string | null = this.getUserName();
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
