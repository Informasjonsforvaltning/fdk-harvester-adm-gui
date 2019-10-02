import React, { PureComponent } from 'react';

import SC from './styled';

class Header extends PureComponent {
  public render(): JSX.Element {
    return (
      <SC.Header>
        <SC.Logo />
      </SC.Header>
    );
  }
}

export default Header;
