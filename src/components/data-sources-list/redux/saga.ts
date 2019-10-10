import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import env from '../../../env';

import * as actions from './actions';
import {
  FETCH_DATA_SOURCES_REQUESTED,
  HARVEST_DATA_SOURCE_REQUESTED,
  REGISTER_DATA_SOURCE_REQUESTED,
  REMOVE_DATA_SOURCE_REQUESTED
} from './action-types';

import { DataSource } from '../../../types';

const { FDK_HARVEST_ADMIN_HOST } = env;

function* fetchDataSourcesRequested() {
  try {
    const { data, message } = yield call(
      axios.get,
      `${FDK_HARVEST_ADMIN_HOST}/api/datasources`
    );
    if (data) {
      yield put(actions.fetchDataSourcesSucceeded(data as DataSource[]));
    } else {
      yield put(actions.fetchDataSourcesFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.fetchDataSourcesFailed(e.message));
  }
}

function* harvestDataSourceRequested(
  action: ReturnType<typeof actions.harvestDataSourceRequested>
) {
  try {
    const data = action.payload.id;
    const error = '';

    if (data) {
      yield put(actions.harvestDataSourceSucceeded());
    } else {
      yield put(actions.harvestDataSourceFailed(JSON.stringify(error)));
    }
  } catch (e) {
    yield put(actions.harvestDataSourceFailed(e.message));
  }
}

function* registerDataSourceRequested(
  action: ReturnType<typeof actions.registerDataSourceRequested>
) {
  try {
    const { dataSource } = action.payload;
    const { headers, message, status } = yield call(
      axios.post,
      `${FDK_HARVEST_ADMIN_HOST}/api/datasources`,
      dataSource
    );
    if (status === 201) {
      yield put(
        actions.registerDataSourceSucceeded({
          id: headers.location,
          ...dataSource
        } as DataSource)
      );
    } else {
      yield put(actions.registerDataSourceFailed(JSON.stringify(message)));
    }
  } catch (e) {
    yield put(actions.registerDataSourceFailed(e.message));
  }
}

function* removeDataSourceRequested(
  action: ReturnType<typeof actions.removeDataSourceRequested>
) {
  try {
    const { id } = action.payload;
    const data = yield { id };
    const error = yield '';
    if (data) {
      yield put(actions.removeDataSourceSucceeded(data.id as string));
    } else {
      yield put(actions.removeDataSourceFailed(JSON.stringify(error)));
    }
  } catch (e) {
    yield put(actions.removeDataSourceFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(FETCH_DATA_SOURCES_REQUESTED, fetchDataSourcesRequested),
    takeLatest(HARVEST_DATA_SOURCE_REQUESTED, harvestDataSourceRequested),
    takeLatest(REGISTER_DATA_SOURCE_REQUESTED, registerDataSourceRequested),
    takeLatest(REMOVE_DATA_SOURCE_REQUESTED, removeDataSourceRequested)
  ]);
}
