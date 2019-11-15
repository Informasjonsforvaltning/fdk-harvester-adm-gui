import { all, call, getContext, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import {
  FIND_ALL_DELEGATEES_REQUESTED,
  REGISTER_DELEGATEE_REQUESTED,
  REMOVE_DELEGATEE_REQUESTED
} from './action-types';

import { Delegatee } from '../../../types';

const { ORGANISATION_CATALOGUE_HOST } = env;

function* findAllDelegateesRequested() {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.get,
      `${ORGANISATION_CATALOGUE_HOST}/organizations/delegated`,
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (Array.isArray(data)) {
      yield put(
        actions.findAllDelegateesSucceeded(data.map(
          ({ organizationId, name }) => ({ id: organizationId, name })
        ) as Delegatee[])
      );
    } else {
      yield put(actions.findAllDelegateesFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.findAllDelegateesFailed(e.message));
  }
}

function* registerDelegateeRequested({
  payload: { id }
}: ReturnType<typeof actions.registerDelegateeRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.put,
      `${ORGANISATION_CATALOGUE_HOST}/organizations/${id}`,
      { allowDelegatedRegistration: true },
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data && data.name) {
      yield put(
        actions.registerDelegateeSucceeded({
          id,
          name: data.name
        })
      );
    } else {
      yield put(actions.registerDelegateeFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.registerDelegateeFailed(e.message));
  }
}

function* removeDelegateeRequested({
  payload: { id }
}: ReturnType<typeof actions.removeDelegateeRequested>) {
  try {
    const auth = yield getContext('auth');
    const authorization = yield call([auth, auth.getAuthorizationHeader]);
    const { data, message } = yield call(
      axios.put,
      `${ORGANISATION_CATALOGUE_HOST}/organizations/${id}`,
      { allowDelegatedRegistration: false },
      {
        headers: {
          authorization,
          accept: 'application/json'
        }
      }
    );
    if (data) {
      yield put(actions.removeDelegateeSucceeded(id));
    } else {
      yield put(actions.removeDelegateeFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.removeDelegateeFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FIND_ALL_DELEGATEES_REQUESTED, findAllDelegateesRequested),
    takeLatest(REGISTER_DELEGATEE_REQUESTED, registerDelegateeRequested),
    takeLatest(REMOVE_DELEGATEE_REQUESTED, removeDelegateeRequested)
  ]);
}
