import React, { PureComponent } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import UpdateIcon from '@material-ui/icons/Update';

import SC from './styled';

import ConceptIcon from '../../images/concept-icon.svg';
import DatasetIcon from '../../images/dataset-icon.svg';

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
        return (
          <SC.DataSourceType>
            <DatasetIcon />
            Datasets
          </SC.DataSourceType>
        );
      case DataSourceType.SKOS_AP_NO:
        return (
          <SC.DataSourceType>
            <ConceptIcon />
            Concepts
          </SC.DataSourceType>
        );
      default:
        return <SC.DataSourceType>Unknown</SC.DataSourceType>;
    }
  }

  public render(): JSX.Element {
    const {
      dataSourceItem: { id, description, url, publisherId },
      onDataSourceItemHarvest,
      onDataSourceItemRemove
    } = this.props;
    const harvestDataSourceItem = () => onDataSourceItemHarvest(id);
    const removeDataSourceItem = () => onDataSourceItemRemove(id);
    return (
      <SC.DataSourceItem>
        {this.renderDatasetType()}
        <SC.DataSourceDetails>
          <SC.DataSourceDetail>
            <span>Publisher:</span>
            <span>{publisherId}</span>
          </SC.DataSourceDetail>
          <SC.DataSourceDetail>
            <span>URI:</span>
            <span>{url}</span>
          </SC.DataSourceDetail>
          <SC.DataSourceDetail>
            <span>Description:</span>
            <span>{description}</span>
          </SC.DataSourceDetail>
        </SC.DataSourceDetails>
        <SC.DatasetItemControls>
          <SC.DatasetItemHarvestButton onClick={harvestDataSourceItem}>
            <UpdateIcon />
            Harvest
          </SC.DatasetItemHarvestButton>
          <SC.DatasetItemEditButton>
            <EditIcon />
            Edit
          </SC.DatasetItemEditButton>
          <SC.DatasetItemRemoveButton onClick={removeDataSourceItem}>
            <HighlightOffIcon />
            Remove
          </SC.DatasetItemRemoveButton>
        </SC.DatasetItemControls>
      </SC.DataSourceItem>
    );
  }
}

export default DataSourceItem;
