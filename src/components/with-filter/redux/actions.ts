import {
  UPDATE_FILTER_REQUESTED,
  UPDATE_FILTER_SUCCEEDED
} from './action-types';

import type { Filter } from '../../../types';

export function updateFilterRequested(filter: Filter) {
  return {
    type: UPDATE_FILTER_REQUESTED,
    payload: {
      filter
    }
  };
}

export function updateFilterSucceeded(filter: Filter) {
  return {
    type: UPDATE_FILTER_SUCCEEDED,
    payload: {
      filter
    }
  };
}
