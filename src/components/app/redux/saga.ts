import { all } from 'redux-saga/effects';

import dataSourcesPageSaga from '../../data-sources-page/redux/saga';

export default function* saga(): Generator {
  yield all([dataSourcesPageSaga()]);
}
