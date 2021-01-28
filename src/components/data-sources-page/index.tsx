import React, { memo, FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators, Dispatch } from 'redux';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import { withAuth } from '../../providers/auth';
import { Auth } from '../../lib/auth/auth';

import * as actions from './redux/actions';

import SC from './styled';

import DataSourceItem from '../data-source-item';
import DataSourceItemEditor from '../data-source-item-editor';

import { DataSource } from '../../types';

type SnackbarVariant = 'harvest:success' | 'harvest:error';

interface ExternalProps {
  dataSources: DataSource[];
  snackbarVariant?: SnackbarVariant;
  actions: typeof actions;
}

interface Props extends ExternalProps {
  authService: Auth;
}

const mapStateToProps = (state: any) => ({
  dataSources: state.DataSourcesPageReducer.get('dataSources').toJS(),
  snackbarVariant: state.DataSourcesPageReducer.get('snackbarVariant')
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

const snackbarVariants = {
  'harvest:success': {
    message: 'Harvest request sent',
    Icon: CheckCircleIcon
  },
  'harvest:error': {
    message: 'Failed to send harvest request',
    Icon: ErrorIcon
  }
};

const DataSourcesPage: FC<Props> = ({
  dataSources,
  snackbarVariant,
  actions: {
    registerDataSourceRequested,
    fetchDataSourcesRequested,
    updateDataSourceRequested,
    removeDataSourceRequested,
    harvestDataSourceRequested
  },
  authService
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [dataSourceId, setDataSourceId] = useState<string | null>(null);

  const showDataSourceItemEditor = () => {
    document.body.classList.add('no-scroll');
    setShowEditor(true);
    setDataSourceId(dataSourceId ?? null);
  };

  const hideDataSourceItemEditor = () => {
    document.body.classList.remove('no-scroll');
    setShowEditor(false);
    setDataSourceId(null);
  };

  const showSnackbar = () => {
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  const showConfirm = () => {
    setShowConfirmModal(true);
    setDataSourceId(dataSourceId);
  };

  const hideConfirm = () => {
    setShowConfirmModal(false);
    setDataSourceId(null);
  };

  const fetchDataSources = () => {
    if (!dataSources.length) {
      fetchDataSourcesRequested();
    }
  };

  const saveDataSourceItem = (dataSource: DataSource, update: boolean) => {
    if (update) {
      updateDataSourceRequested(dataSource as DataSource);
    } else {
      registerDataSourceRequested(dataSource);
    }
    hideDataSourceItemEditor();
  };

  const harvestDataSourceItem = (id: string) => {
    harvestDataSourceRequested(id);
  };

  const removeDataSourceItem = () => {
    if (dataSourceId) {
      hideConfirm();
      removeDataSourceRequested(dataSourceId);
    }
  };

  const hasSystemAdminPermission = authService.hasSystemAdminPermission();
  const hasOrganizationAdminPermissions = authService.hasOrganizationAdminPermissions();

  const filteredDataSources = dataSources.filter(({ publisherId }) => {
    if (hasOrganizationAdminPermissions && !hasSystemAdminPermission) {
      return authService.hasOrganizationAdminPermission(publisherId);
    }

    return true;
  });

  const dataSource = filteredDataSources.find(({ id }) => id === dataSourceId);

  const SnackbarContent = () => {
    if (snackbarVariant) {
      const { Icon, message } = snackbarVariants[snackbarVariant];
      return (
        <SC.SnackbarContent
          type={snackbarVariant}
          message={
            <span className='message'>
              <Icon />
              {message}
            </span>
          }
          action={[
            <IconButton
              key='close'
              aria-label='close'
              color='inherit'
              onClick={hideSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    if (snackbarVariant) {
      showSnackbar();
    }
  }, [snackbarVariant]);

  fetchDataSources();

  return (
    <>
      <SC.DataSourcesPage>
        {filteredDataSources.map(dataSourceItem => (
          <DataSourceItem
            key={dataSourceItem.id}
            dataSourceItem={dataSourceItem}
            onDataSourceItemHarvest={harvestDataSourceItem}
            onDataSourceItemEdit={showDataSourceItemEditor}
            onDataSourceItemRemove={showConfirm}
          />
        ))}
      </SC.DataSourcesPage>
      <SC.RegisterDataSourceButton onClick={() => showDataSourceItemEditor()}>
        <AddIcon />
      </SC.RegisterDataSourceButton>
      {snackbarVariant && snackbarOpen && (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={hideSnackbar}
        >
          <SnackbarContent />
        </Snackbar>
      )}
      {showEditor && (
        <DataSourceItemEditor
          dataSource={dataSource}
          onDiscard={hideDataSourceItemEditor}
          onSave={saveDataSourceItem}
        />
      )}
      <SC.ConfirmDialog open={showConfirmModal} onClose={hideConfirm}>
        <DialogTitle>Confirm data source removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm that you would like to remove a data source.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideConfirm} color='primary'>
            Cancel
          </Button>
          <Button onClick={removeDataSourceItem} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </SC.ConfirmDialog>
    </>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withAuth,
  connect(mapStateToProps, mapDispatchToProps)
)(DataSourcesPage);
