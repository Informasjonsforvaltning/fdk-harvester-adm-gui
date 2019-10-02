import {
  FETCH_DATA_SOURCES_FAILED,
  FETCH_DATA_SOURCES_REQUESTED,
  FETCH_DATA_SOURCES_SUCCEEDED,
  REGISTER_DATA_SOURCE_FAILED,
  REGISTER_DATA_SOURCE_REQUESTED,
  REGISTER_DATA_SOURCE_SUCCEEDED,
  REMOVE_DATA_SOURCE_FAILED,
  REMOVE_DATA_SOURCE_REQUESTED,
  REMOVE_DATA_SOURCE_SUCCEEDED
} from './action-types';

import { DataSource } from '../../../types';

export function fetchDataSourcesRequested() {
  return {
    type: FETCH_DATA_SOURCES_REQUESTED
  };
}

export function fetchDataSourcesSucceeded(dataSources: DataSource[]) {
  return {
    type: FETCH_DATA_SOURCES_SUCCEEDED,
    payload: {
      dataSources
    }
  };
}

export function fetchDataSourcesFailed(message: string) {
  return {
    type: FETCH_DATA_SOURCES_FAILED,
    payload: {
      message
    }
  };
}

export function registerDataSourceRequested(dataSource: DataSource) {
  return {
    type: REGISTER_DATA_SOURCE_REQUESTED,
    payload: {
      dataSource
    }
  };
}

export function registerDataSourceSucceeded(dataSource: DataSource) {
  return {
    type: REGISTER_DATA_SOURCE_SUCCEEDED,
    payload: {
      dataSource
    }
  };
}

export function registerDataSourceFailed(message: string) {
  return {
    type: REGISTER_DATA_SOURCE_FAILED,
    payload: {
      message
    }
  };
}

export function removeDataSourceRequested(id: string) {
  return {
    type: REMOVE_DATA_SOURCE_REQUESTED,
    payload: {
      id
    }
  };
}

export function removeDataSourceSucceeded(id: string) {
  return {
    type: REMOVE_DATA_SOURCE_SUCCEEDED,
    payload: {
      id
    }
  };
}

export function removeDataSourceFailed(message: string) {
  return {
    type: REMOVE_DATA_SOURCE_FAILED,
    payload: {
      message
    }
  };
}
