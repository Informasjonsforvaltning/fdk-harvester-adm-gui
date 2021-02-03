import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Filter } from '../../types';

import * as actions from './redux/actions';

export interface Props {
  filter: Filter;
  filterActions: typeof actions;
}

const withFilter = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    filter: state.FilterReducer.get('filter')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    filterActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withFilter;
