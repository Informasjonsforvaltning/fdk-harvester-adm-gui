import { combineReducers } from 'redux';

import DataSourcesPageReducer from '../../data-sources-page/redux/reducer';
import DelegationPageReducer from '../../delegation-page/redux/reducer';
import OrganisationFinderReducer from '../../organisation-finder/redux/reducer';

export default combineReducers({
  DataSourcesPageReducer,
  DelegationPageReducer,
  OrganisationFinderReducer
});
