import { all } from 'redux-saga/effects';

import dataSourcesSaga from '../../../components/with-data-sources/redux/saga';
import organizationsSaga from '../../../components/with-organizations/redux/saga';
import filterSaga from '../../../components/with-filter/redux/saga';
import delegationPageSaga from '../../../components/with-delegations/redux/saga';
import organizationFinderSaga from '../../../components/organization-finder/redux/saga';

export default function* saga(): Generator {
  yield all([
    dataSourcesSaga(),
    organizationsSaga(),
    filterSaga(),
    delegationPageSaga(),
    organizationFinderSaga()
  ]);
}
