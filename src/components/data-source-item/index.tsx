import React, { PureComponent } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
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

interface State {
  editing: boolean;
}

enum DataSourceType {
  DCAT_AP_NO = 'DCAT-AP-NO',
  SKOS_AP_NO = 'SKOS-AP-NO'
}

class DataSourceItem extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editing: false
    };
  }

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
      onDataSourceItemRemove
    } = this.props;
    const { editing } = this.state;
    const harvestDataSourceItem = () => onDataSourceItemHarvest(id);
    const editDataSourceItem = () => this.setState({ editing: true });
    const confirmEditDataSourceItem = () => this.setState({ editing: false });
    const cancelEditDataSourceItem = () => this.setState({ editing: false });
    const removeDataSourceItem = () => onDataSourceItemRemove(id);
    return (
      <SC.DatasetItemControls>
        {editing ? (
          <>
            <SC.ConfirmEditButton onClick={confirmEditDataSourceItem}>
              <DoneIcon />
              Confirm
            </SC.ConfirmEditButton>
            <SC.CancelEditButton onClick={cancelEditDataSourceItem}>
              <CloseIcon />
              Cancel
            </SC.CancelEditButton>
          </>
        ) : (
          <>
            <SC.DatasetItemHarvestButton onClick={harvestDataSourceItem}>
              <UpdateIcon />
              Harvest
            </SC.DatasetItemHarvestButton>
            <SC.DatasetItemEditButton onClick={editDataSourceItem}>
              <EditIcon />
              Edit
            </SC.DatasetItemEditButton>
            <SC.DatasetItemRemoveButton onClick={removeDataSourceItem}>
              <HighlightOffIcon />
              Remove
            </SC.DatasetItemRemoveButton>
          </>
        )}
      </SC.DatasetItemControls>
    );
  }

  public render(): JSX.Element {
    const {
      dataSourceItem: { description, url, publisherId }
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
