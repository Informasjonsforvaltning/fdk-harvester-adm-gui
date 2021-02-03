import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { DataSource, SnackbarVariant } from '../../types';

import * as actions from './redux/actions';

export interface Props {
  fetchingDataSources: boolean;
  dataSources: DataSource[];
  dataSourceActions: typeof actions;
  snackbarVariant: SnackbarVariant;
}

const withDataSources = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    fetchingDataSources: state.DataSourcesReducer.get('isFetching'),
    dataSources: state.DataSourcesReducer.get('dataSources')?.toJS(),
    snackbarVariant: state.DataSourcesReducer.get('snackbarVariant')
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    dataSourceActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withDataSources;
