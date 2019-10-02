import React, { PureComponent } from 'react';

import SC from './styled';

import DataSourcesList from '../data-sources-list';

class Root extends PureComponent {
  public render(): JSX.Element {
    return (
      <SC.Root>
        <SC.Heading>Data Sources</SC.Heading>
        <DataSourcesList />
      </SC.Root>
    );
  }
}

export default Root;
