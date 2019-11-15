import { all } from 'redux-saga/effects';

import dataSourcesPageSaga from '../../data-sources-page/redux/saga';
import delegationPageSaga from '../../delegation-page/redux/saga';
import organisationFinderSaga from '../../organisation-finder/redux/saga';

export default function* saga(): Generator {
  yield all([
    dataSourcesPageSaga(),
    delegationPageSaga(),
    organisationFinderSaga()
  ]);
}
