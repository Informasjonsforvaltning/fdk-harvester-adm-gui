import { all, call, getContext, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import { FIND_ONE_DELEGATEE_REQUESTED } from './action-types';

const { ORGANIZATION_CATALOGUE_HOST } = env;

function* findOneDelegateeRequested({
  payload: { id, onError }
}: ReturnType<typeof actions.findOneDelegateeRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.get,
      `${ORGANIZATION_CATALOGUE_HOST}/organizations/${id}`,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data && data.name) {
      yield put(actions.findOneDelegateeSucceeded({ id, name: data.name }));
    } else {
      yield put(actions.findOneDelegateeFailed(JSON.stringify(message)));
      onError('Organization not found');
    }
  } catch (e) {
    yield put(actions.findOneDelegateeFailed(e.message));
    onError(
      e.response.status === 404
        ? 'Organization not found'
        : 'Something went wrong'
    );
  }
}

export default function* saga() {
  yield all([
    takeLatest(FIND_ONE_DELEGATEE_REQUESTED, findOneDelegateeRequested)
  ]);
}
