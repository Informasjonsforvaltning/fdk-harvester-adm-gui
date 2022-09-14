import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import {
  FETCH_ORGANIZATION_REQUESTED,
  FETCH_ORGANIZATIONS_REQUESTED
} from './action-types';

import type { Organization } from '../../../types';

const { ORGANIZATION_CATALOG_URI } = env;

function* fetchOrganizationsRequested() {
  try {
    const { data, message } = yield call(
      axios.get,
      `${ORGANIZATION_CATALOG_URI}/organizations`
    );
    if (Array.isArray(data)) {
      yield put(actions.fetchOrganizationsSucceeded(data as Organization[]));
    } else {
      yield put(actions.fetchOrganizationsFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.fetchOrganizationsFailed(e.message));
  }
}

function* fetchOrganizationRequested({
  payload: { id }
}: ReturnType<typeof actions.fetchOrganizationRequested>) {
  try {
    const { data, message } = yield call(
      axios.get,
      `${ORGANIZATION_CATALOG_URI}/organizations/${id}`
    );
    if (Array.isArray(data)) {
      yield put(actions.fetchOrganizationsSucceeded(data as Organization[]));
    } else {
      yield put(actions.fetchOrganizationsFailed(JSON.stringify(message)));
    }
  } catch (e: any) {
    yield put(actions.fetchOrganizationsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FETCH_ORGANIZATIONS_REQUESTED, fetchOrganizationsRequested),
    takeLatest(FETCH_ORGANIZATION_REQUESTED, fetchOrganizationRequested)
  ]);
}
