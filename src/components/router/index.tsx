import React, { PureComponent, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Header from '../header';
import SideMenu from '../side-menu';
import Root from '../root';
import ProtectedRoute from '../protected-route';

const DataSourcesPage = lazy(() => import('../data-sources-page'));
const WhitelistPage = lazy(() => import('../whitelist-page'));
const DelegationPage = lazy(() => import('../delegation-page'));
const LoginPage = lazy(() => import('../login'));

export default class Router extends PureComponent {
  public render(): JSX.Element {
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
              />
              <ProtectedRoute
                exact
                path='/delegation'
                component={DelegationPage}
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