import React, { memo, FC, lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  RouteComponentProps
} from 'react-router-dom';
import { compose } from 'redux';

import Footer from '@fellesdatakatalog/internal-footer';
import Header from '../../../components/header';
import Root from '../../../components/root';
import ProtectedRoute from '../../../components/protected-route';
import { withAuth } from '../../../providers/auth';
import { Auth } from '../../../lib/auth/auth';

const DataSourcesPage = lazy(
  () =>
    import('../../../components/data-sources-page/components/data-sources-page')
);
const DelegationPage = lazy(
  () => import('../../../components/delegation-page/components/delegation-page')
);
const LoginPage = lazy(() => import('../../../components/login-page'));

interface Props extends RouteComponentProps {
  authService: Auth;
}

const Router: FC<Props> = ({ authService }) => {
  const hasSystemAdminPermission = authService.hasSystemAdminPermission();
  return (
    <BrowserRouter>
      <Header />
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
              path='/delegations'
              component={DelegationPage}
              disabled={!hasSystemAdminPermission}
            />
            <Route exact path='/login' component={LoginPage} />
            <Redirect from='/' to='/data-sources' />
          </Switch>
        </Suspense>
      </Root>

      <Footer />
    </BrowserRouter>
  );
};

export default compose<FC>(memo, withAuth)(Router);
