import {
  FIND_ONE_DELEGATEE_FAILED,
  FIND_ONE_DELEGATEE_REQUESTED,
  FIND_ONE_DELEGATEE_SUCCEEDED
} from './action-types';

import { Delegatee } from '../../../types';

export function findOneDelegateeRequested(
  id: string,
  onError: (message: string) => void
) {
  return {
    type: FIND_ONE_DELEGATEE_REQUESTED,
    payload: {
      id,
      onError
    }
  };
}

export function findOneDelegateeSucceeded(delegatee: Delegatee) {
  return {
    type: FIND_ONE_DELEGATEE_SUCCEEDED,
    payload: {
      delegatee
    }
  };
}

export function findOneDelegateeFailed(message: string) {
  return {
    type: FIND_ONE_DELEGATEE_FAILED,
    payload: {
      message
    }
  };
}
