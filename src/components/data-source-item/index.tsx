import React, { PureComponent } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import UpdateIcon from '@material-ui/icons/Update';

import SC from './styled';

import { DataSource } from '../../types';

interface Props {
  dataSourceItem: DataSource;
  onDataSourceItemHarvest: (id: string) => void;
  onDataSourceItemRemove: (id: string) => void;
}

enum DataSourceType {
  DCAT_AP_NO = 'DCAT-AP-NO',
  SKOS_AP_NO = 'SKOS-AP-NO'
}

class DataSourceItem extends PureComponent<Props> {
  private renderDatasetType(): JSX.Element {
    const {
      dataSourceItem: { dataSourceType }
    } = this.props;
    switch (dataSourceType) {
      case DataSourceType.DCAT_AP_NO:
        return <SC.DataSourceType>Dataset</SC.DataSourceType>;
      case DataSourceType.SKOS_AP_NO:
        return <SC.DataSourceType>Concept</SC.DataSourceType>;
      default:
        return <SC.DataSourceType>Unknown</SC.DataSourceType>;
    }
  }

  public render(): JSX.Element {
    const {
      dataSourceItem: { id, url },
      onDataSourceItemHarvest,
      onDataSourceItemRemove
    } = this.props;
    const harvestDataSourceItem = () => onDataSourceItemHarvest(id);
    const removeDataSourceItem = () => onDataSourceItemRemove(id);
    return (
      <SC.DataSourceItem>
        {this.renderDatasetType()}
        <span>{url}</span>
        <SC.DatasetItemControls>
          <SC.DatasetItemHarvestButton onClick={harvestDataSourceItem}>
            <UpdateIcon />
          </SC.DatasetItemHarvestButton>
          <SC.DatasetItemEditButton>
            <EditIcon />
          </SC.DatasetItemEditButton>
          <SC.DatasetItemRemoveButton onClick={removeDataSourceItem}>
            <HighlightOffIcon />
          </SC.DatasetItemRemoveButton>
        </SC.DatasetItemControls>
      </SC.DataSourceItem>
    );
  }
}

export default DataSourceItem;
