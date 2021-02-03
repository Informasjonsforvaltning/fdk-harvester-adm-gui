import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  FETCH_DATA_SOURCES_REQUESTED,
  FETCH_DATA_SOURCES_SUCCEEDED,
  FETCH_DATA_SOURCES_FAILED,
  HARVEST_DATA_SOURCE_SUCCEEDED,
  HARVEST_DATA_SOURCE_FAILED,
  HARVEST_DATA_SOURCE_REQUESTED,
  REGISTER_DATA_SOURCE_SUCCEEDED,
  UPDATE_DATA_SOURCE_SUCCEEDED,
  REMOVE_DATA_SOURCE_SUCCEEDED
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  dataSources: [],
  organizations: [],
  snackbarVariant: undefined
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case FETCH_DATA_SOURCES_REQUESTED:
      return state.set('isFetching', true);
    case FETCH_DATA_SOURCES_SUCCEEDED:
      return state
        .set('dataSources', fromJS(action.payload.dataSources))
        .set('isFetching', false);
    case FETCH_DATA_SOURCES_FAILED:
      return state.set('dataSources', fromJS([])).set('isFetching', false);
    case REGISTER_DATA_SOURCE_SUCCEEDED:
      return state.update('dataSources', (dataSources: any) =>
        dataSources.push(fromJS(action.payload.dataSource))
      );
    case UPDATE_DATA_SOURCE_SUCCEEDED:
      return state.update('dataSources', (dataSources: any) =>
        dataSources.map((dataSource: any) =>
          dataSource.get('id') === action.payload.dataSource.id
            ? fromJS(action.payload.dataSource)
            : dataSource
        )
      );
    case REMOVE_DATA_SOURCE_SUCCEEDED:
      return state.update('dataSources', (dataSources: any) =>
        dataSources.filter(
          (dataSource: any) => dataSource.get('id') !== action.payload.id
        )
      );
    case HARVEST_DATA_SOURCE_REQUESTED:
      return state.set('snackbarVariant', undefined);
    case HARVEST_DATA_SOURCE_SUCCEEDED:
      return state.set('snackbarVariant', 'harvest:success');
    case HARVEST_DATA_SOURCE_FAILED:
      return state.set('snackbarVariant', 'harvest:error');
    default:
      return state;
  }
}
