import React, { memo, FC } from 'react';
import { compose } from 'redux';
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

const SideMenu: FC<Props> = ({ location, authService }) => {
  const hasSystemAdminPermission = authService.hasSystemAdminPermission();
  const hasOrganizationAdminPermissions = authService.hasOrganizationAdminPermissions();

  const sideMenuItems = () => {
    const menuItems = [
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

    return menuItems
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
  };

  return (
    <SC.SideMenu>
      <SC.Navigation>
        <ul>{sideMenuItems()}</ul>
      </SC.Navigation>
    </SC.SideMenu>
  );
};

export default compose<FC>(memo, withRouter, withAuth)(SideMenu);
