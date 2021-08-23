import {
  FETCH_ORGANIZATIONS_FAILED,
  FETCH_ORGANIZATIONS_REQUESTED,
  FETCH_ORGANIZATIONS_SUCCEEDED
} from './action-types';

import type { Organization } from '../../../types';

export function fetchOrganizationsRequested() {
  return {
    type: FETCH_ORGANIZATIONS_REQUESTED,
    payload: {}
  };
}

export function fetchOrganizationsSucceeded(organizations: Organization[]) {
  return {
    type: FETCH_ORGANIZATIONS_SUCCEEDED,
    payload: {
      organizations
    }
  };
}

export function fetchOrganizationsFailed(message: string) {
  return {
    type: FETCH_ORGANIZATIONS_FAILED,
    payload: {
      message
    }
  };
}
