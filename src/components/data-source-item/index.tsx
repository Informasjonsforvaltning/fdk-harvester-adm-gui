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
  onDataSourceItemEdit: (id: string) => void;
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

  private renderDatasetControls(): JSX.Element {
    const {
      dataSourceItem: { id },
      onDataSourceItemHarvest,
      onDataSourceItemEdit,
      onDataSourceItemRemove
    } = this.props;
    const harvestDataSourceItem = () => onDataSourceItemHarvest(id);
    const editDataSourceItem = () => onDataSourceItemEdit(id);
    const removeDataSourceItem = () => onDataSourceItemRemove(id);
    return (
      <SC.DatasetItemControls>
        <SC.DatasetItemHarvestButton
          onClick={harvestDataSourceItem}
          variant='contained'
          startIcon={<UpdateIcon />}
        >
          Harvest
        </SC.DatasetItemHarvestButton>
        <SC.DatasetItemEditButton
          onClick={editDataSourceItem}
          variant='contained'
          startIcon={<EditIcon />}
        >
          Edit
        </SC.DatasetItemEditButton>
        <SC.DatasetItemRemoveButton
          onClick={removeDataSourceItem}
          variant='contained'
          startIcon={<HighlightOffIcon />}
        >
          Remove
        </SC.DatasetItemRemoveButton>
      </SC.DatasetItemControls>
    );
  }

  public render(): JSX.Element {
    const {
      dataSourceItem: { publisherId, url, acceptHeaderValue, description }
    } = this.props;
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
            <span>Data type:</span>
            <span>{acceptHeaderValue}</span>
          </SC.DataSourceDetail>
          <SC.DataSourceDetail>
            <span>Description:</span>
            <span>{description}</span>
          </SC.DataSourceDetail>
        </SC.DataSourceDetails>
        {this.renderDatasetControls()}
      </SC.DataSourceItem>
    );
  }
}

export default DataSourceItem;
