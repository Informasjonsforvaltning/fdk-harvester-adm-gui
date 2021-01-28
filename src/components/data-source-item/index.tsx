import React, { memo, FC } from 'react';
import { compose } from 'redux';
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

interface ExternalProps {
  dataSourceItem: DataSource;
  onDataSourceItemHarvest: (id: string) => void;
  onDataSourceItemEdit: (id: string) => void;
  onDataSourceItemRemove: (id: string) => void;
}

interface Props extends ExternalProps {}

const DataSourceItem: FC<Props> = ({
  dataSourceItem: {
    id,
    dataType,
    publisherId,
    url,
    acceptHeaderValue,
    description
  },
  onDataSourceItemHarvest,
  onDataSourceItemEdit,
  onDataSourceItemRemove
}) => {
  const DataSourceType = () => {
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
      case DataType.PUBLIC_SERVICE:
        return (
          <SC.DataSourceType>
            <SC.PublicServiceIcon />
            Public Services
          </SC.DataSourceType>
        );
      default:
        return <SC.DataSourceType>Unknown</SC.DataSourceType>;
    }
  };

  const DatasetItemControls = () => (
    <SC.DatasetItemControls>
      <SC.DatasetItemHarvestButton
        onClick={() => onDataSourceItemHarvest(id)}
        variant='contained'
        startIcon={<UpdateIcon />}
      >
        Harvest
      </SC.DatasetItemHarvestButton>
      <SC.DatasetItemEditButton
        onClick={() => onDataSourceItemEdit(id)}
        variant='contained'
        startIcon={<EditIcon />}
      >
        Edit
      </SC.DatasetItemEditButton>
      <SC.DatasetItemRemoveButton
        onClick={() => onDataSourceItemRemove(id)}
        variant='contained'
        startIcon={<HighlightOffIcon />}
      >
        Remove
      </SC.DatasetItemRemoveButton>
    </SC.DatasetItemControls>
  );

  return (
    <SC.DataSourceItem>
      <DataSourceType />
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
      <DatasetItemControls />
    </SC.DataSourceItem>
  );
};

export default compose<FC<ExternalProps>>(memo)(DataSourceItem);
