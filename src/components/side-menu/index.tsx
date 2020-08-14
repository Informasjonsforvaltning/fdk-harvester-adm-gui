import React, { PureComponent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import ViewListIcon from '@material-ui/icons/ViewList';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

import { Auth } from '../../lib/auth/auth';
import { withAuth } from '../../providers/auth';

import SC from './styled';

interface Props extends RouteComponentProps {
  authService: Auth;
}

class SideMenu extends PureComponent<Props> {
  private renderSideMenuItems(): JSX.Element[] {
    const { location, authService } = this.props;

    const hasSystemAdminPermission = authService.hasSystemAdminPermission();
    const hasOrganizationAdminPermissions = authService.hasOrganizationAdminPermissions();

    const sideMenuItems = [
      {
        title: 'Data Sources',
        path: '/data-sources',
        icon: ViewListIcon,
        visible: hasSystemAdminPermission || hasOrganizationAdminPermissions
      },
      {
        title: 'Whitelist',
        path: '/whitelist',
        icon: PlaylistAddCheckIcon,
        visible: hasSystemAdminPermission
      },
      {
        title: 'Delegation',
        path: '/delegation',
        icon: RecentActorsIcon,
        visible: hasSystemAdminPermission
      }
    ];

    return sideMenuItems
      .filter(({ visible }) => visible)
      .map(({ title, path, icon: Icon }, index) => (
        <SC.SideMenuItem
          key={`${title}-${index}`}
          selected={location.pathname.indexOf(path) !== -1}
        >
          <Link to={path}>
            {Icon && <Icon />}
            <span>{title}</span>
          </Link>
        </SC.SideMenuItem>
      ));
  }

  public render(): JSX.Element {
    return (
      <SC.SideMenu>
        <SC.Navigation>
          <ul>{this.renderSideMenuItems()}</ul>
        </SC.Navigation>
      </SC.SideMenu>
    );
  }
}

export default withRouter(withAuth(SideMenu));
