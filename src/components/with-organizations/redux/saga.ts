import { all, call, getContext, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import { FETCH_ORGANIZATIONS_REQUESTED } from './action-types';

import type { Organization } from '../../../types';

const { ORGANIZATION_CATALOGUE_HOST } = env;

function* fetchOrganizationsRequested({
  payload: { ids }
}: ReturnType<typeof actions.fetchOrganizationsRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.get,
      `${ORGANIZATION_CATALOGUE_HOST}/organizations`,
      {
        headers: {
          authorization
        },
        params: {
          organizationId: ids.join()
        }
      }
    );
    if (Array.isArray(data)) {
      yield put(actions.fetchOrganizationsSucceeded(data as Organization[]));
    } else {
      yield put(actions.fetchOrganizationsFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.fetchOrganizationsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FETCH_ORGANIZATIONS_REQUESTED, fetchOrganizationsRequested)
  ]);
}
