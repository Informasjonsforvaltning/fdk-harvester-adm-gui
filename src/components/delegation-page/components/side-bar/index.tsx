import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Auth } from '../../../../lib/auth/auth';
import { withAuth } from '../../../../providers/auth';

import SC from './styled';
import { Filter } from '../../../../types';
import * as FilterActions from '../../../with-filter/redux/actions';

interface ExternalProps {
  title?: string;
}

interface Props extends ExternalProps, RouteComponentProps {
  authService: Auth;
  filter: Filter;
  filterActions: typeof FilterActions;
}

const SideBar: FC<Props> = ({ title, authService, location }) => {
  const hasSystemAdminPermission = authService.hasSystemAdminPermission();
  const hasOrganizationAdminPermissions = authService.hasOrganizationAdminPermissions();

  const { pathname } = location;

  const sideMenuItems = () => {
    const menuItems = [
      {
        title: 'Datakilder',
        id: '/data-sources',
        active: pathname === '/data-sources',
        visible: hasSystemAdminPermission || hasOrganizationAdminPermissions
      },
      {
        title: 'Delegeringer',
        id: '/delegations',
        active: pathname === '/delegations',
        visible: hasSystemAdminPermission
      }
    ];

    return menuItems.filter(({ visible }) => visible);
  };

  return (
    <SC.SideBar>
      <SC.SideMenu title={title} menuItems={sideMenuItems()} />
    </SC.SideBar>
  );
};

export default compose<FC<ExternalProps>>(memo, withRouter, withAuth)(SideBar);
