import { all, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import { UPDATE_FILTER_REQUESTED } from './action-types';

function* updateFilterRequested({
  payload: { filter }
}: ReturnType<typeof actions.updateFilterRequested>) {
  yield put(actions.updateFilterSucceeded(filter));
}

export default function* saga() {
  yield all([takeLatest(UPDATE_FILTER_REQUESTED, updateFilterRequested)]);
}
