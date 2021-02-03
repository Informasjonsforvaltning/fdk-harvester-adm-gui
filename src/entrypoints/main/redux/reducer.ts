import { combineReducers } from 'redux';

import DataSourcesReducer from '../../../components/with-data-sources/redux/reducer';
import OrganizationsReducer from '../../../components/with-organizations/redux/reducer';
import FilterReducer from '../../../components/with-filter/redux/reducer';
import DelegationsReducer from '../../../components/with-delegations/redux/reducer';
import OrganizationFinderReducer from '../../../components/organization-finder/redux/reducer';

export default combineReducers({
  DataSourcesReducer,
  OrganizationsReducer,
  FilterReducer,
  DelegationsReducer,
  OrganizationFinderReducer
});
