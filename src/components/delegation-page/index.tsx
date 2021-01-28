import React, { memo, FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators, Dispatch } from 'redux';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

import * as actions from './redux/actions';

import SC from './styled';

import DelegateeItem from '../delegatee-item';
import OrganisationFinder from '../organisation-finder';

import { Delegatee } from '../../types';

interface ExternalProps {
  delegatees: Delegatee[];
  actions: typeof actions;
}

interface Props extends ExternalProps {}

const mapStateToProps = (state: any) => ({
  delegatees: state.DelegationPageReducer.get('delegatees').toJS()
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

const DelegationPage: FC<Props> = ({
  delegatees,
  actions: {
    findAllDelegateesRequested,
    registerDelegateeRequested,
    removeDelegateeRequested
  }
}) => {
  const [
    showOrganisationFinderState,
    setShowOrganisationFinderState
  ] = useState(false);
  const [showConfirmModalState, setShowConfirmModalState] = useState(false);
  const [delegateeId, setDelegateeId] = useState<string | null>(null);

  const showOrganisationFinder = () => {
    document.body.classList.add('no-scroll');
    setShowOrganisationFinderState(true);
  };

  const hideOrganisationFinder = () => {
    document.body.classList.remove('no-scroll');
    setShowOrganisationFinderState(false);
  };

  const showConfirmModal = (id: string) => {
    setShowConfirmModalState(true);
    setDelegateeId(id);
  };

  const hideConfirmModal = () => {
    setShowConfirmModalState(false);
    setDelegateeId(null);
  };

  const fetchDelegatees = () => {
    if (!delegatees.length) {
      findAllDelegateesRequested();
    }
  };

  const saveDelegatee = (id: string) => {
    hideOrganisationFinder();
    registerDelegateeRequested(id);
  };

  const removeDelegatee = () => {
    // const { delegateeId } = this.state;
    if (delegateeId) {
      hideConfirmModal();
      removeDelegateeRequested(delegateeId);
    }
  };

  useEffect(() => {
    fetchDelegatees();
  }, []);

  return (
    <SC.DelegationPage>
      {delegatees.map(delegatee => (
        <DelegateeItem
          key={delegatee.id}
          delegatee={delegatee}
          onDelegateeRemove={id => showConfirmModal(id)}
        />
      ))}
      <SC.RegisterDelegateeButton onClick={showOrganisationFinder}>
        <AddIcon />
      </SC.RegisterDelegateeButton>
      {showConfirmModalState ? (
        <SC.ConfirmDialog
          open={showConfirmModalState}
          onClose={hideConfirmModal}
        >
          <DialogTitle>Confirm organisation removal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please confirm that you would like to remove an organisation with
              delegation persmission.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={hideConfirmModal} color='primary'>
              Cancel
            </Button>
            <Button onClick={removeDelegatee} color='primary'>
              Confirm
            </Button>
          </DialogActions>
        </SC.ConfirmDialog>
      ) : null}
      {showOrganisationFinderState ? (
        <OrganisationFinder
          onDiscard={hideOrganisationFinder}
          onSave={saveDelegatee}
        />
      ) : null}
    </SC.DelegationPage>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  connect(mapStateToProps, mapDispatchToProps)
)(DelegationPage);
