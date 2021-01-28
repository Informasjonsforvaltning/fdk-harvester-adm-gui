import React, { memo, FC } from 'react';
import { compose } from 'redux';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import SC from './styled';

import OrganisationIcon from '../../images/organisation-icon.svg';

import { Delegatee } from '../../types';

interface ExternalProps {
  delegatee: Delegatee;
  onDelegateeRemove: (id: string) => void;
}

interface Props extends ExternalProps {}

const DelegateeItem: FC<Props> = ({
  delegatee: { id, name },
  onDelegateeRemove
}) => (
  <SC.DelegateeItem>
    <SC.DelegateeType>
      <OrganisationIcon />
      Organisation
    </SC.DelegateeType>
    <SC.DelegateeDetails>
      <SC.DelegateeName>{name}</SC.DelegateeName>
      <SC.DelegateeDetail>
        <span>Organisation number:</span>
        <span>{id}</span>
      </SC.DelegateeDetail>
    </SC.DelegateeDetails>
    <SC.DelegateeControls>
      <SC.DelegateeRemoveButton
        onClick={() => onDelegateeRemove(id)}
        variant='contained'
        startIcon={<HighlightOffIcon />}
      >
        Remove
      </SC.DelegateeRemoveButton>
    </SC.DelegateeControls>
  </SC.DelegateeItem>
);

export default compose<FC<ExternalProps>>(memo)(DelegateeItem);
