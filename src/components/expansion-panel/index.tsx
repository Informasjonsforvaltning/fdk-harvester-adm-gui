import React, { memo, FC, useState, PropsWithChildren } from 'react';
import { Collapse } from 'react-collapse';
import { compose } from 'redux';

import SC from './styled';

interface ExternalProps {
  title?: string;
}

interface Props extends ExternalProps {}

const ExpansionPanel: FC<PropsWithChildren<Props>> = ({ title, children }) => {
  const [isOpened, setIsOpened] = useState(true);

  const togglePanel = () => {
    setIsOpened(!isOpened);
  };

  return (
    <SC.Panel>
      <SC.Header onClick={togglePanel}>
        <span>{title}</span>
      </SC.Header>

      <Collapse isOpened={isOpened}>
        <SC.Content>{children}</SC.Content>
      </Collapse>
    </SC.Panel>
  );
};

export default compose<FC<ExternalProps>>(memo)(ExpansionPanel);
