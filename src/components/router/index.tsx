import React, { PureComponent, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { withAuth } from '../../providers/auth';
import { Auth } from '../../lib/auth/auth';

import Header from '../header';
import SideMenu from '../side-menu';
import Root from '../root';
import ProtectedRoute from '../protected-route';

const DataSourcesPage = lazy(() => import('../data-sources-page'));
const WhitelistPage = lazy(() => import('../whitelist-page'));
const DelegationPage = lazy(() => import('../delegation-page'));
const LoginPage = lazy(() => import('../login-page'));

interface Props {
  authService: Auth;
}

class Router extends PureComponent<Props> {
  public render(): JSX.Element {
    const { authService } = this.props;

    const hasSystemAdminPermission = authService.hasSystemAdminPermission();

    return (
      <BrowserRouter>
        <Header />
        <SideMenu />
        <Root>
          <Suspense fallback={<></>}>
            <Switch>
              <ProtectedRoute
                exact
                path='/data-sources'
                component={DataSourcesPage}
              />
              <ProtectedRoute
                exact
                path='/whitelist'
                component={WhitelistPage}
                disabled={!hasSystemAdminPermission}
              />
              <ProtectedRoute
                exact
                path='/delegation'
                component={DelegationPage}
                disabled={!hasSystemAdminPermission}
              />
              <Route exact path='/login' component={LoginPage} />
              <Redirect from='/' to='/data-sources' />
            </Switch>
          </Suspense>
        </Root>
      </BrowserRouter>
    );
  }
}

export default withAuth(Router);
