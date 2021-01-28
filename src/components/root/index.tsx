import React, { memo, FC, PropsWithChildren } from 'react';
import { compose } from 'redux';

import SC from './styled';

const Root: FC<PropsWithChildren<any>> = ({ children }) => (
  <SC.Root>{children}</SC.Root>
);

export default compose<FC>(memo)(Root);
