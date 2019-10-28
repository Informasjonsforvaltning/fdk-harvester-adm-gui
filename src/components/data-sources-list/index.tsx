import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import * as actions from './redux/actions';

import SC from './styled';

import DataSourceItem from '../data-source-item';
import DataSourceItemEditor from '../data-source-item-editor';

import { DataSource } from '../../types';

type SnackbarVariant = 'harvest:success' | 'harvest:error';

interface Props {
  dataSources: DataSource[];
  snackbarVariant?: SnackbarVariant;
  actions: typeof actions;
}

interface State {
  snackbarOpen: boolean;
  showEditor: boolean;
  showConfirmModal: boolean;
  dataSourceId?: string;
}

const snackbarVariants = {
  'harvest:success': {
    message: 'Harvest request sent',
    Icon: CheckCircleIcon
  },
  'harvest:error': {
    message: 'Failed to send harvest request',
    Icon: ErrorIcon
  }
};

class DataSourcesList extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      snackbarOpen: false,
      showEditor: false,
      showConfirmModal: false,
      dataSourceId: undefined
    };

    this.showDataSourceItemEditor = this.showDataSourceItemEditor.bind(this);
    this.hideDataSourceItemEditor = this.hideDataSourceItemEditor.bind(this);
    this.showConfirmModal = this.showConfirmModal.bind(this);
    this.hideConfirmModal = this.hideConfirmModal.bind(this);
    this.saveDataSourceItem = this.saveDataSourceItem.bind(this);
    this.harvestDataSourceItem = this.harvestDataSourceItem.bind(this);
    this.removeDataSourceItem = this.removeDataSourceItem.bind(this);
    this.hideSnackbar = this.hideSnackbar.bind(this);
  }

  public componentDidMount(): void {
    this.fetchDataSources();
  }

  public componentDidUpdate(prevProps: Props): void {
    const { snackbarVariant } = this.props;
    const { snackbarVariant: prevSnackbarVariant } = prevProps;
    if (snackbarVariant && snackbarVariant !== prevSnackbarVariant) {
      this.showSnackbar();
    }
  }

  private fetchDataSources(): void {
    const {
      actions: { fetchDataSourcesRequested },
      dataSources
    } = this.props;
    if (!dataSources.length) {
      fetchDataSourcesRequested();
    }
  }

  private showDataSourceItemEditor(dataSourceId?: string): void {
    document.body.classList.add('no-scroll');
    this.setState({ showEditor: true, dataSourceId });
  }

  private hideDataSourceItemEditor(): void {
    document.body.classList.remove('no-scroll');
    this.setState({ showEditor: false, dataSourceId: undefined });
  }

  private saveDataSourceItem(
    dataSource: Omit<DataSource, 'id'>,
    update: boolean
  ): void {
    const {
      actions: { registerDataSourceRequested, updateDataSourceRequested }
    } = this.props;
    this.hideDataSourceItemEditor();
    if (update) {
      updateDataSourceRequested(dataSource as DataSource);
    } else {
      registerDataSourceRequested(dataSource);
    }
  }

  private harvestDataSourceItem(id: string): void {
    const {
      actions: { harvestDataSourceRequested }
    } = this.props;
    harvestDataSourceRequested(id);
  }

  private removeDataSourceItem(): void {
    const {
      actions: { removeDataSourceRequested }
    } = this.props;
    const { dataSourceId } = this.state;
    if (dataSourceId) {
      this.hideConfirmModal();
      removeDataSourceRequested(dataSourceId);
    }
  }

  private showSnackbar(): void {
    this.setState({ snackbarOpen: true });
  }

  private hideSnackbar(): void {
    this.setState({ snackbarOpen: false });
  }

  private showConfirmModal(dataSourceId: string): void {
    this.setState({ showConfirmModal: true, dataSourceId });
  }

  private hideConfirmModal(): void {
    this.setState({ showConfirmModal: false, dataSourceId: undefined });
  }

  private renderSnackbarContent(snackbarVariant: SnackbarVariant): JSX.Element {
    const { Icon, message } = snackbarVariants[snackbarVariant];
    return (
      <SC.SnackbarContent
        type={snackbarVariant}
        message={
          <span className='message'>
            <Icon />
            {message}
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='close'
            color='inherit'
            onClick={this.hideSnackbar}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }

  public render(): JSX.Element {
    const { dataSources, snackbarVariant } = this.props;
    const {
      snackbarOpen,
      showEditor,
      showConfirmModal,
      dataSourceId
    } = this.state;
    const dataSource = dataSources.find(({ id }) => id === dataSourceId);
    return (
      <>
        <SC.DataSources>
          {dataSources.map(dataSourceItem => (
            <DataSourceItem
              key={dataSourceItem.id}
              dataSourceItem={dataSourceItem}
              onDataSourceItemHarvest={this.harvestDataSourceItem}
              onDataSourceItemEdit={this.showDataSourceItemEditor}
              onDataSourceItemRemove={this.showConfirmModal}
            />
          ))}
        </SC.DataSources>
        <SC.RegisterDataSourceButton
          onClick={() => this.showDataSourceItemEditor()}
        >
          <AddIcon />
        </SC.RegisterDataSourceButton>
        {snackbarVariant && snackbarOpen && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={this.hideSnackbar}
          >
            {this.renderSnackbarContent(snackbarVariant)}
          </Snackbar>
        )}
        {showEditor && (
          <DataSourceItemEditor
            dataSource={dataSource}
            onDiscard={this.hideDataSourceItemEditor}
            onSave={this.saveDataSourceItem}
          />
        )}
        <SC.ConfirmDialog
          open={showConfirmModal}
          onClose={this.hideConfirmModal}
        >
          <DialogTitle>Confirm data source removal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please confirm that you would like to remove a data source.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.hideConfirmModal} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.removeDataSourceItem} color='primary'>
              Confirm
            </Button>
          </DialogActions>
        </SC.ConfirmDialog>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  dataSources: state.DataSourcesReducer.get('dataSources').toJS(),
  snackbarVariant: state.DataSourcesReducer.get('snackbarVariant')
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSourcesList);
