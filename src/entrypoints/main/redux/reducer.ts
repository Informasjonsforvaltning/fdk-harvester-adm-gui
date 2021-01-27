import { combineReducers } from 'redux';

import DataSourcesPageReducer from '../../../components/data-sources-page/redux/reducer';
import DelegationPageReducer from '../../../components/delegation-page/redux/reducer';
import OrganisationFinderReducer from '../../../components/organisation-finder/redux/reducer';

export default combineReducers({
  DataSourcesPageReducer,
  DelegationPageReducer,
  OrganisationFinderReducer
});
