import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import AddIcon from '@material-ui/icons/Add';

import * as actions from './redux/actions';

import SC from './styled';

import DataSourceItem from '../data-source-item';

import { DataSource } from '../../types';

interface Props {
  dataSources: DataSource[];
  actions: typeof actions;
}

class DataSourcesList extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.addDataSourceItem = this.addDataSourceItem.bind(this);
    this.removeDataSourceItem = this.removeDataSourceItem.bind(this);
  }

  public componentDidMount(): void {
    this.fetchDataSources();
  }

  public componentDidUpdate(): void {
    this.fetchDataSources();
  }

  private fetchDataSources(): void {
    const {
      actions: { fetchDataSourcesRequested },
      dataSources
    } = this.props;
    if (!dataSources.length) {
      fetchDataSourcesRequested();
    }
  }

  private addDataSourceItem(): void {
    const {
      actions: { registerDataSourceRequested },
      dataSources
    } = this.props;
    const index: number = dataSources.length;
    registerDataSourceRequested({
      id: `id:${Math.random()}`,
      dataSourceType:
        Math.round(Math.random()) > 0.5 ? 'DCAT-AP-NO' : 'SCOS-AP-NO',
      url: `http://localhost/${index}`,
      publisher: `publisher:${index}`,
      description: `description:${index}`
    });
  }

  private removeDataSourceItem(id: string): void {
    const {
      actions: { removeDataSourceRequested }
    } = this.props;
    removeDataSourceRequested(id);
  }

  public render(): JSX.Element {
    const { dataSources } = this.props;
    return (
      <>
        <SC.DataSources>
          {dataSources.map(dataSourceItem => (
            <DataSourceItem
              key={dataSourceItem.id}
              dataSourceItem={dataSourceItem}
              onDataSourceItemRemove={this.removeDataSourceItem}
            />
          ))}
        </SC.DataSources>
        <SC.RegisterDataSourceButton onClick={this.addDataSourceItem}>
          <AddIcon />
        </SC.RegisterDataSourceButton>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  dataSources: state.DataSourcesReducer.get('dataSources').toJS()
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSourcesList);
