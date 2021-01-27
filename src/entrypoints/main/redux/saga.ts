import { all } from 'redux-saga/effects';

import dataSourcesPageSaga from '../../../components/data-sources-page/redux/saga';
import delegationPageSaga from '../../../components/delegation-page/redux/saga';
import organisationFinderSaga from '../../../components/organisation-finder/redux/saga';

export default function* saga(): Generator {
  yield all([
    dataSourcesPageSaga(),
    delegationPageSaga(),
    organisationFinderSaga()
  ]);
}
