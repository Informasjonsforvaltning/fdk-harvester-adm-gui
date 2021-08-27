import {
  FETCH_ORGANIZATIONS_FAILED,
  FETCH_ORGANIZATIONS_REQUESTED,
  FETCH_ORGANIZATIONS_SUCCEEDED,
  FETCH_ORGANIZATION_FAILED,
  FETCH_ORGANIZATION_REQUESTED,
  FETCH_ORGANIZATION_SUCCEEDED
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

export function fetchOrganizationRequested(id: string) {
  return {
    type: FETCH_ORGANIZATION_REQUESTED,
    payload: { id }
  };
}

export function fetchOrganizationSucceeded(organization: Organization) {
  return {
    type: FETCH_ORGANIZATION_SUCCEEDED,
    payload: {
      organization
    }
  };
}

export function fetchOrganizationFailed(message: string) {
  return {
    type: FETCH_ORGANIZATION_FAILED,
    payload: {
      message
    }
  };
}
