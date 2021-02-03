import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Delegatee } from '../../types';

import * as actions from './redux/actions';

export interface Props {
  delegatees: Delegatee[];
  delegationActions: typeof actions;
}

const withDelegations = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    delegatees: state.DelegationsReducer.get('delegatees')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    delegationActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withDelegations;
