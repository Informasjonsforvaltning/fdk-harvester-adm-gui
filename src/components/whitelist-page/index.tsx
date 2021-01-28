import React, { memo, FC } from 'react';
import { compose } from 'redux';

import SC from './styled';

const WhitelistPage: FC = () => (
  <SC.WhitelistPage>WHITELIST PAGE</SC.WhitelistPage>
);

export default compose<FC>(memo)(WhitelistPage);
