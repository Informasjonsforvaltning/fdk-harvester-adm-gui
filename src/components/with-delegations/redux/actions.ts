import {
  FIND_ALL_DELEGATEES_FAILED,
  FIND_ALL_DELEGATEES_REQUESTED,
  FIND_ALL_DELEGATEES_SUCCEEDED,
  REGISTER_DELEGATEE_FAILED,
  REGISTER_DELEGATEE_REQUESTED,
  REGISTER_DELEGATEE_SUCCEEDED,
  REMOVE_DELEGATEE_FAILED,
  REMOVE_DELEGATEE_REQUESTED,
  REMOVE_DELEGATEE_SUCCEEDED
} from './action-types';

import { Delegatee } from '../../../types';

export function findAllDelegateesRequested() {
  return {
    type: FIND_ALL_DELEGATEES_REQUESTED
  };
}

export function findAllDelegateesSucceeded(delegatees: Delegatee[]) {
  return {
    type: FIND_ALL_DELEGATEES_SUCCEEDED,
    payload: {
      delegatees
    }
  };
}

export function findAllDelegateesFailed(message: string) {
  return {
    type: FIND_ALL_DELEGATEES_FAILED,
    payload: {
      message
    }
  };
}

export function registerDelegateeRequested(id: string) {
  return {
    type: REGISTER_DELEGATEE_REQUESTED,
    payload: {
      id
    }
  };
}

export function registerDelegateeSucceeded(delegatee: Delegatee) {
  return {
    type: REGISTER_DELEGATEE_SUCCEEDED,
    payload: {
      delegatee
    }
  };
}

export function registerDelegateeFailed(message: string) {
  return {
    type: REGISTER_DELEGATEE_FAILED,
    payload: {
      message
    }
  };
}

export function removeDelegateeRequested(id: string) {
  return {
    type: REMOVE_DELEGATEE_REQUESTED,
    payload: {
      id
    }
  };
}

export function removeDelegateeSucceeded(id: string) {
  return {
    type: REMOVE_DELEGATEE_SUCCEEDED,
    payload: {
      id
    }
  };
}

export function removeDelegateeFailed(message: string) {
  return {
    type: REMOVE_DELEGATEE_FAILED,
    payload: {
      message
    }
  };
}
