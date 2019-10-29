import React, { PureComponent, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Root from '../root';
import ProtectedRoute from '../protected-route';

const DataSourcesPage = lazy(() => import('../data-sources-list'));
const LoginPage = lazy(() => import('../login'));

export default class Router extends PureComponent {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Root>
          <Suspense fallback={<></>}>
            <Switch>
              <ProtectedRoute
                exact
                path='/data-sources'
                component={DataSourcesPage}
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
