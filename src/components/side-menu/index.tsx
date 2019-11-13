import React, { PureComponent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import ViewListIcon from '@material-ui/icons/ViewList';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

import SC from './styled';

class SideMenu extends PureComponent<RouteComponentProps<any>> {
  private renderSideMenuItems(): JSX.Element[] {
    const { location } = this.props;
    const sideMenuItems = [
      {
        title: 'Data Sources',
        path: '/data-sources',
        icon: ViewListIcon
      },
      {
        title: 'Whitelist',
        path: '/whitelist',
        icon: PlaylistAddCheckIcon
      },
      {
        title: 'Delegation',
        path: '/delegation',
        icon: RecentActorsIcon
      }
    ];
    return sideMenuItems.map((item, index) => (
      <SC.SideMenuItem
        key={`${item.title}-${index}`}
        selected={location.pathname.indexOf(item.path) !== -1}
      >
        <Link to={item.path}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
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

export default withRouter(SideMenu);
