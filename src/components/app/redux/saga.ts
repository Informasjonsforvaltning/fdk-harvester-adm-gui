import { all } from 'redux-saga/effects';

import dataSourcesSaga from '../../data-sources-list/redux/saga';

export default function* saga(): Generator {
  yield all([dataSourcesSaga()]);
}
