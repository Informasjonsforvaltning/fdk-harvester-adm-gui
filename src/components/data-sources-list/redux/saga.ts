import { all, put, takeLatest } from 'redux-saga/effects';

// import GraphQLClient, { gql } from '../../../graphql';

import * as actions from './actions';
import {
  FETCH_DATA_SOURCES_REQUESTED,
  HARVEST_DATA_SOURCE_REQUESTED,
  REGISTER_DATA_SOURCE_REQUESTED,
  REMOVE_DATA_SOURCE_REQUESTED
} from './action-types';

import { DataSource } from '../../../types';

// const FETCH_EMPLOYEES_QUERY = gql`
//   query fetchEmployees($projectId: String!, $managerId: Int!) {
//     employees: fetchEmployees(projectId: $projectId, managerId: $managerId) {
//       id
//       firstName
//       lastName
//       loginId
//       title
//       city
//       country
//       bookings {
//         id
//         type
//         startDate
//         endDate
//         loading
//       }
//     }
//   }
// `;

const dataSources: DataSource[] = [...Array(2)].map((_, index) => ({
  id: `id:${index}`,
  dataSourceType: Math.round(Math.random()) > 0.5 ? 'DCAT-AP-NO' : 'SCOS-AP-NO',
  url: `http://localhost/${index}`,
  publisher: `publisher:${index}`,
  description: `description:${index}`
}));

function* fetchDataSourcesRequested() {
  try {
    const data = yield { dataSources };
    const error = yield '';
    // const { data, error } = yield call(GraphQLClient.query, {
    //   query: FETCH_EMPLOYEES_QUERY,
    //   variables: {
    //     projectId: action.payload.project.id,
    //     managerId: action.payload.managerId
    //   },
    //   fetchPolicy: 'no-cache'
    // });
    if (data) {
      yield put(
        actions.fetchDataSourcesSucceeded(data.dataSources as DataSource[])
      );
    } else {
      yield put(actions.fetchDataSourcesFailed(JSON.stringify(error)));
    }
  } catch (e) {
    yield put(actions.fetchDataSourcesFailed(e.message));
  }
}

function* harvestDataSourceRequested(
  action: ReturnType<typeof actions.harvestDataSourceRequested>
) {
  try {
    const data = yield { dataSources };
    const error = yield '';
    console.log('HARVEST', action.payload.id);
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
    const data = yield { dataSource };
    const error = yield '';
    // const { data, error } = yield call(GraphQLClient.query, {
    //   query: FETCH_EMPLOYEES_QUERY,
    //   variables: {
    //     projectId: action.payload.project.id,
    //     managerId: action.payload.managerId
    //   },
    //   fetchPolicy: 'no-cache'
    // });
    if (data) {
      yield put(
        actions.registerDataSourceSucceeded(data.dataSource as DataSource)
      );
    } else {
      yield put(actions.registerDataSourceFailed(JSON.stringify(error)));
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
    // const { data, error } = yield call(GraphQLClient.query, {
    //   query: FETCH_EMPLOYEES_QUERY,
    //   variables: {
    //     projectId: action.payload.project.id,
    //     managerId: action.payload.managerId
    //   },
    //   fetchPolicy: 'no-cache'
    // });
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
