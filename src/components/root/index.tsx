import React, { PureComponent } from 'react';

import { withAuth } from '../../providers/auth';
import { AuthServiceInteface } from '../../services/auth';

import SC from './styled';

import DataSourcesList from '../data-sources-list';

interface Props {
  authService: AuthServiceInteface;
}

class Root extends PureComponent<Props> {
  public render(): JSX.Element {
    const { authService } = this.props;
    const authenticated: boolean = authService.isAuthenticated();
    return authenticated ? (
      <SC.Root>
        <SC.Heading>Data Sources</SC.Heading>
        <DataSourcesList />
      </SC.Root>
    ) : (
      <></>
    );
  }
}

export default withAuth(Root);
