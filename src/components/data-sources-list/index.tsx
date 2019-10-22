import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import * as actions from './redux/actions';

import SC from './styled';

import DataSourceItem from '../data-source-item';

import { DataSource } from '../../types';

type SnackbarVariant = 'harvest:success' | 'harvest:error';

interface Props {
  dataSources: DataSource[];
  snackbarVariant?: SnackbarVariant;
  actions: typeof actions;
}

interface State {
  snackbarOpen: boolean;
}

const snackbarVariants = {
  'harvest:success': {
    message: 'Harvest successful',
    Icon: CheckCircleIcon
  },
  'harvest:error': {
    message: 'Harvest failed',
    Icon: ErrorIcon
  }
};

class DataSourcesList extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      snackbarOpen: false
    };

    this.addDataSourceItem = this.addDataSourceItem.bind(this);
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

  private addDataSourceItem(): void {
    const {
      actions: { registerDataSourceRequested }
    } = this.props;
    const index: number = Math.random();
    registerDataSourceRequested({
      dataSourceType:
        Math.round(Math.random()) > 0.5 ? 'DCAT-AP-NO' : 'SKOS-AP-NO',
      url: `http://localhost/${index}`,
      publisherId: `publisher:${index}`,
      description: `description:${index}`,
      acceptHeaderValue: 'text/turtle'
    });
  }

  private harvestDataSourceItem(id: string): void {
    const {
      actions: { harvestDataSourceRequested }
    } = this.props;
    harvestDataSourceRequested(id);
  }

  private showSnackbar(): void {
    this.setState({ snackbarOpen: true });
  }

  private hideSnackbar(): void {
    this.setState({ snackbarOpen: false });
  }

  private removeDataSourceItem(id: string): void {
    const {
      actions: { removeDataSourceRequested }
    } = this.props;
    removeDataSourceRequested(id);
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
    const { snackbarOpen } = this.state;
    return (
      <>
        <SC.DataSources>
          {dataSources.map(dataSourceItem => (
            <DataSourceItem
              key={dataSourceItem.id}
              dataSourceItem={dataSourceItem}
              onDataSourceItemHarvest={this.harvestDataSourceItem}
              onDataSourceItemRemove={this.removeDataSourceItem}
            />
          ))}
        </SC.DataSources>
        <SC.RegisterDataSourceButton onClick={this.addDataSourceItem}>
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
