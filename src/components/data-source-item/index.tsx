import React, { PureComponent } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import UpdateIcon from '@material-ui/icons/Update';

import SC from './styled';

import ConceptIcon from '../../images/concept-icon.svg';
import DatasetIcon from '../../images/dataset-icon.svg';
import InformationModelIcon from '../../images/information-model-icon.svg';
import DataServiceIcon from '../../images/dataservice-icon.svg';

import { DataSource } from '../../types';
import { DataType } from '../../types/enums';

interface Props {
  dataSourceItem: DataSource;
  onDataSourceItemHarvest: (id: string) => void;
  onDataSourceItemEdit: (id: string) => void;
  onDataSourceItemRemove: (id: string) => void;
}

class DataSourceItem extends PureComponent<Props> {
  private renderDatasetType(): JSX.Element {
    const {
      dataSourceItem: { dataType }
    } = this.props;
    switch (dataType) {
      case DataType.DATASET:
        return (
          <SC.DataSourceType>
            <DatasetIcon />
            Datasets
          </SC.DataSourceType>
        );
      case DataType.CONCEPT:
        return (
          <SC.DataSourceType>
            <ConceptIcon />
            Concepts
          </SC.DataSourceType>
        );
      case DataType.INFORMATION_MODEL:
        return (
          <SC.DataSourceType>
            <InformationModelIcon />
            Information Models
          </SC.DataSourceType>
        );
      case DataType.DATASERVICE:
        return (
          <SC.DataSourceType>
            <DataServiceIcon />
            Data Services
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
