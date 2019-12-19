import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
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

interface Props {
  delegatees: Delegatee[];
  actions: typeof actions;
}

interface State {
  showOrganisationFinder: boolean;
  showConfirmModal: boolean;
  delegateeId?: string;
}

class DelegationPage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showOrganisationFinder: false,
      showConfirmModal: false,
      delegateeId: undefined
    };

    this.saveDelegatee = this.saveDelegatee.bind(this);
    this.removeDelegatee = this.removeDelegatee.bind(this);
    this.showOrganisationFinder = this.showOrganisationFinder.bind(this);
    this.hideOrganisationFinder = this.hideOrganisationFinder.bind(this);
    this.showConfirmModal = this.showConfirmModal.bind(this);
    this.hideConfirmModal = this.hideConfirmModal.bind(this);
  }

  public componentDidMount(): void {
    this.fetchDelegatees();
  }

  private fetchDelegatees(): void {
    const {
      actions: { findAllDelegateesRequested },
      delegatees
    } = this.props;
    if (!delegatees.length) {
      findAllDelegateesRequested();
    }
  }

  private saveDelegatee(id: string): void {
    const {
      actions: { registerDelegateeRequested }
    } = this.props;
    this.hideOrganisationFinder();
    registerDelegateeRequested(id);
  }

  private removeDelegatee(): void {
    const {
      actions: { removeDelegateeRequested }
    } = this.props;
    const { delegateeId } = this.state;
    if (delegateeId) {
      this.hideConfirmModal();
      removeDelegateeRequested(delegateeId);
    }
  }

  private showOrganisationFinder(): void {
    document.body.classList.add('no-scroll');
    this.setState({ showOrganisationFinder: true });
  }

  private hideOrganisationFinder(): void {
    document.body.classList.remove('no-scroll');
    this.setState({ showOrganisationFinder: false });
  }

  private showConfirmModal(delegateeId: string): void {
    this.setState({ showConfirmModal: true, delegateeId });
  }

  private hideConfirmModal(): void {
    this.setState({ showConfirmModal: false, delegateeId: undefined });
  }

  private renderOrganisationFinder(): JSX.Element | null {
    const { showOrganisationFinder } = this.state;
    return showOrganisationFinder ? (
      <OrganisationFinder
        onDiscard={this.hideOrganisationFinder}
        onSave={this.saveDelegatee}
      />
    ) : null;
  }

  private renderConfirmDialog(): JSX.Element | null {
    const { showConfirmModal } = this.state;
    return showConfirmModal ? (
      <SC.ConfirmDialog open={showConfirmModal} onClose={this.hideConfirmModal}>
        <DialogTitle>Confirm organisation removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm that you would like to remove an organisation with
            delegation persmission.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideConfirmModal} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.removeDelegatee} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </SC.ConfirmDialog>
    ) : null;
  }

  public render(): JSX.Element {
    const { delegatees } = this.props;
    return (
      <SC.DelegationPage>
        {delegatees.map(delegatee => (
          <DelegateeItem
            key={delegatee.id}
            delegatee={delegatee}
            onDelegateeRemove={this.showConfirmModal}
          />
        ))}
        <SC.RegisterDelegateeButton onClick={this.showOrganisationFinder}>
          <AddIcon />
        </SC.RegisterDelegateeButton>
        {this.renderConfirmDialog()}
        {this.renderOrganisationFinder()}
      </SC.DelegationPage>
    );
  }
}

const mapStateToProps = (state: any) => ({
  delegatees: state.DelegationPageReducer.get('delegatees').toJS()
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DelegationPage);
