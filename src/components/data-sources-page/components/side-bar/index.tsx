import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Auth } from '../../../../lib/auth/auth';
import { withAuth } from '../../../../providers/auth';

import SC from './styled';
import { Filter } from '../../../../types';
import withFilter from '../../../with-filter';
import * as FilterActions from '../../../with-filter/redux/actions';
import { DataType } from '../../../../types/enums';

interface ExternalProps {
  title?: string;
}

interface Props extends ExternalProps, RouteComponentProps {
  authService: Auth;
  filter: Filter;
  filterActions: typeof FilterActions;
}

const SideBar: FC<Props> = ({
  title,
  authService,
  location,
  filterActions: { updateFilterRequested }
}) => {
  const [organizationSearch, setOrganizationSearch] = useState('');
  const [selectedDataType, setSelectedDataType] = useState<
    DataType | undefined
  >(undefined);

  const hasSystemAdminPermission = authService.hasSystemAdminPermission();
  const hasOrganizationAdminPermissions =
    authService.hasOrganizationAdminPermissions();

  const { pathname } = location;

  const onClickSearch = (value: string) => {
    setOrganizationSearch(value);
    updateFilterRequested({
      publisherSearch: value,
      dataType: selectedDataType
    });
  };

  const onSelectDataType = (type: DataType) => {
    if (selectedDataType !== type) {
      setSelectedDataType(type);
      updateFilterRequested({
        publisherSearch: organizationSearch,
        dataType: type
      });
    } else {
      setSelectedDataType(undefined);
      updateFilterRequested({
        publisherSearch: organizationSearch
      });
    }
  };

  const sideMenuItems = () => {
    const menuItems = [
      {
        title: 'Datakilder',
        id: '/data-sources',
        active: pathname === '/data-sources',
        visible: hasSystemAdminPermission || hasOrganizationAdminPermissions
      },
      {
        title: 'Delegeringer',
        id: '/delegations',
        active: pathname === '/delegations',
        visible: hasSystemAdminPermission
      }
    ];

    return menuItems.filter(({ visible }) => visible);
  };

  return (
    <SC.SideBar>
      <SC.SideMenu title={title} menuItems={sideMenuItems()} />
      <SC.ExpansionPanel title='Utgiver'>
        <SC.SearchField
          value={organizationSearch}
          onClick={onClickSearch}
          placeholder='Søk etter utgiver'
        />
      </SC.ExpansionPanel>
      <SC.ExpansionPanel title='Datakilde'>
        <SC.List>
          <SC.ListItem onClick={() => onSelectDataType(DataType.DATASERVICE)}>
            <input
              type='radio'
              checked={selectedDataType === DataType.DATASERVICE}
              onChange={() => onSelectDataType(DataType.DATASERVICE)}
            />
            API-katalog
          </SC.ListItem>
          <SC.ListItem onClick={() => onSelectDataType(DataType.CONCEPT)}>
            <input
              type='radio'
              checked={selectedDataType === DataType.CONCEPT}
              onChange={() => onSelectDataType(DataType.CONCEPT)}
            />
            Begrepskatalog
          </SC.ListItem>
          <SC.ListItem onClick={() => onSelectDataType(DataType.DATASET)}>
            <input
              type='radio'
              checked={selectedDataType === DataType.DATASET}
              onChange={() => onSelectDataType(DataType.DATASET)}
            />
            Datasettkatalog
          </SC.ListItem>
          <SC.ListItem
            onClick={() => onSelectDataType(DataType.INFORMATION_MODEL)}
          >
            <input
              type='radio'
              checked={selectedDataType === DataType.INFORMATION_MODEL}
              onChange={() => onSelectDataType(DataType.INFORMATION_MODEL)}
            />
            Informasjonsmodellkatalog
          </SC.ListItem>
          <SC.ListItem
            onClick={() => onSelectDataType(DataType.PUBLIC_SERVICE)}
          >
            <input
              type='radio'
              checked={selectedDataType === DataType.PUBLIC_SERVICE}
              onChange={() => onSelectDataType(DataType.PUBLIC_SERVICE)}
            />
            Tjeneste- og hendelseskatalog
          </SC.ListItem>
        </SC.List>
      </SC.ExpansionPanel>
    </SC.SideBar>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withRouter,
  withAuth,
  withFilter
)(SideBar);
