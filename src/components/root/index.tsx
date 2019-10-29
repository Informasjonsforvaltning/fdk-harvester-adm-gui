import React, { PureComponent } from 'react';

import SC from './styled';

class Root extends PureComponent {
  public render(): JSX.Element {
    return <SC.Root {...this.props} />;
  }
}

export default Root;
