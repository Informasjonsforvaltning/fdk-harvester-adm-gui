import React, { PureComponent } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import SC from './styled';

import OrganisationIcon from '../../images/organisation-icon.svg';

import { Delegatee } from '../../types';

interface Props {
  delegatee: Delegatee;
  onDelegateeRemove: (id: string) => void;
}

class DelegateeItem extends PureComponent<Props> {
  private renderDelegateeControls(): JSX.Element {
    const {
      delegatee: { id },
      onDelegateeRemove
    } = this.props;
    const removeDelegatee = () => onDelegateeRemove(id);
    return (
      <SC.DelegateeControls>
        <SC.DelegateeRemoveButton
          onClick={removeDelegatee}
          variant='contained'
          startIcon={<HighlightOffIcon />}
        >
          Remove
        </SC.DelegateeRemoveButton>
      </SC.DelegateeControls>
    );
  }

  public render(): JSX.Element {
    const {
      delegatee: { id, name }
    } = this.props;
    return (
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
        {this.renderDelegateeControls()}
      </SC.DelegateeItem>
    );
  }
}

export default DelegateeItem;
