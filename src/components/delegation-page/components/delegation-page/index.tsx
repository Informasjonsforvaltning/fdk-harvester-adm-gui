import React, { memo, FC, useEffect, useState } from 'react';
import { compose } from 'redux';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button, { Variant } from '@fellesdatakatalog/button';
import SC from './styled';

import DelegateeItem from '../../../delegatee-item';
import OrganizationFinder from '../../../organization-finder';

import { withAuth } from '../../../../providers/auth';
import withDelegations from '../../../with-delegations';
import withOrganizations from '../../../with-organizations';

import * as DelegationActions from '../../../with-delegations/redux/actions';
import * as OrganizationActions from '../../../with-organizations/redux/actions';

import { Delegatee, Organization } from '../../../../types';
import SideBar from '../side-bar';
import { Auth } from '../../../../lib/auth/auth';

interface Props {
  authService: Auth;
  organizations: Organization[];
  organizationActions: typeof OrganizationActions;
  delegatees: Delegatee[];
  delegationActions: typeof DelegationActions;
}

const DelegationPage: FC<Props> = ({
  authService,
  delegatees,
  delegationActions: {
    findAllDelegateesRequested,
    registerDelegateeRequested,
    removeDelegateeRequested
  },
  organizations,
  organizationActions: { fetchOrganizationsRequested }
}) => {
  const [
    showOrganizationFinderState,
    setShowOrganizationFinderState
  ] = useState(false);
  const [showConfirmModalState, setShowConfirmModalState] = useState(false);
  const [delegateeId, setDelegateeId] = useState<string | null>(null);

  const showOrganizationFinder = () => {
    document.body.classList.add('no-scroll');
    setShowOrganizationFinderState(true);
  };

  const hideOrganizationFinder = () => {
    document.body.classList.remove('no-scroll');
    setShowOrganizationFinderState(false);
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
    hideOrganizationFinder();
    registerDelegateeRequested(id);
  };

  const removeDelegatee = () => {
    if (delegateeId) {
      hideConfirmModal();
      removeDelegateeRequested(delegateeId);
    }
  };

  const fetchOrganizations = () => {
    if (!organizations.length) {
      fetchOrganizationsRequested(
        authService.getOrganizationsWithAdminPermission()
      );
    }
  };

  useEffect(() => {
    fetchDelegatees();
  }, []);

  fetchOrganizations();

  return (
    <div>
      <SC.Title>
        {organizations.length === 1
          ? `Delegeringer for ${organizations[0].name}`
          : 'Dine delegeringer'}
      </SC.Title>
      <SC.Container>
        <SideBar />
        <SC.DelegationContent>
          <SC.ButtonBar>
            <Button
              onClick={() => showOrganizationFinder()}
              variant={Variant.PRIMARY}
            >
              <SC.AddIcon /> Ny delegering
            </Button>
          </SC.ButtonBar>
          {delegatees.map(delegatee => (
            <DelegateeItem
              key={delegatee.id}
              delegatee={delegatee}
              onDelegateeRemove={id => showConfirmModal(id)}
            />
          ))}
          {showConfirmModalState ? (
            <SC.ConfirmDialog
              open={showConfirmModalState}
              onClose={hideConfirmModal}
            >
              <DialogTitle>Confirm organization removal</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please confirm that you would like to remove an organization
                  with delegation persmission.
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
          {showOrganizationFinderState ? (
            <OrganizationFinder
              onDiscard={hideOrganizationFinder}
              onSave={saveDelegatee}
            />
          ) : null}
        </SC.DelegationContent>
      </SC.Container>
    </div>
  );
};

export default compose<FC>(
  memo,
  withAuth,
  withDelegations,
  withOrganizations
)(DelegationPage);
