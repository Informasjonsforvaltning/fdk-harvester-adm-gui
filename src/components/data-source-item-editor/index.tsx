import React, { memo, FC, ChangeEvent } from 'react';
import { compose } from 'redux';
import { Form, withFormik, FormikProps, WithFormikConfig } from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import { withAuth } from '../../providers/auth';
import { Auth } from '../../lib/auth/auth';

import SC from './styled';

import validationSchema from './validation-schema';

import { DataSource } from '../../types';
import { Standard, DataType, MimeType } from '../../types/enums';

interface FormValues extends Omit<DataSource, 'id'> {}

interface ExternalProps {
  dataSource?: Partial<DataSource>;
  onDiscard: () => void;
  onSave: (dataSource: DataSource, update: boolean) => void;
}

interface Props extends ExternalProps, FormikProps<FormValues> {
  authService: Auth;
}

const DataSourceItemEditor: FC<Props> = ({
  onDiscard,
  values,
  errors,
  touched,
  isValid,
  isSubmitting,
  handleChange,
  setFieldTouched,
  authService
}) => {
  const formatDataType = (dataType: DataType): string => {
    switch (dataType) {
      case DataType.CONCEPT: {
        return 'Concepts';
      }
      case DataType.DATASET: {
        return 'Datasets';
      }
      case DataType.INFORMATION_MODEL: {
        return 'Information Models';
      }
      case DataType.DATASERVICE: {
        return 'Data Service';
      }
      default: {
        return '';
      }
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setFieldTouched(e.target.name);
  };

  const hasSystemAdminPermission = authService.hasSystemAdminPermission();
  const hasOrganizationAdminPermissions = authService.hasOrganizationAdminPermissions();
  const organizationsWithAdminPermission = authService.getOrganizationsWithAdminPermission();

  return (
    <SC.DataSourceItemEditor>
      <SC.Modal>
        <SC.ModalHeading>Register new data source</SC.ModalHeading>
        <Form noValidate>
          <SC.Fieldset>
            <TextField
              select
              name='dataType'
              value={values.dataType || ''}
              label='Data source type'
              onChange={onChange}
              variant='outlined'
              required
              fullWidth
              error={touched.dataType && !!errors.dataType}
              helperText={touched.dataType && errors.dataType}
            >
              {[
                DataType.CONCEPT,
                DataType.DATASET,
                DataType.INFORMATION_MODEL,
                DataType.DATASERVICE
              ].map(dataType => (
                <MenuItem key={dataType} value={dataType}>
                  {formatDataType(dataType)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              name='dataSourceType'
              value={values.dataSourceType || ''}
              label='Data standard'
              onChange={onChange}
              variant='outlined'
              required
              fullWidth
              error={touched.dataSourceType && !!errors.dataSourceType}
              helperText={touched.dataSourceType && errors.dataSourceType}
            >
              {[Standard.SKOS_AP_NO, Standard.DCAT_AP_NO].map(standard => (
                <MenuItem key={standard} value={standard}>
                  {standard}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              name='url'
              value={values.url}
              label='Data source URL'
              onChange={onChange}
              variant='outlined'
              required
              fullWidth
              error={touched.url && !!errors.url}
              helperText={touched.url && errors.url}
            />
            <TextField
              select={
                hasOrganizationAdminPermissions && !hasSystemAdminPermission
              }
              name='publisherId'
              value={values.publisherId}
              label='Organisation number'
              onChange={onChange}
              variant='outlined'
              required
              fullWidth
              error={touched.publisherId && !!errors.publisherId}
              helperText={touched.publisherId && errors.publisherId}
            >
              {hasOrganizationAdminPermissions &&
                !hasSystemAdminPermission &&
                organizationsWithAdminPermission.map(organization => (
                  <MenuItem key={organization} value={organization}>
                    {organization}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              name='description'
              value={values.description}
              label='Description'
              onChange={onChange}
              variant='outlined'
              fullWidth
              multiline
              rows='5'
              error={touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />
            <TextField
              select
              name='acceptHeaderValue'
              value={values.acceptHeaderValue || ''}
              label='Accept header'
              onChange={onChange}
              variant='outlined'
              required
              fullWidth
              error={touched.acceptHeaderValue && !!errors.acceptHeaderValue}
              helperText={touched.acceptHeaderValue && errors.acceptHeaderValue}
            >
              {[
                MimeType.TEXT_TURTLE,
                MimeType.RDF_XML,
                MimeType.RDF_JSON,
                MimeType.LD_JSON,
                MimeType.NTRIPLES,
                MimeType.N3
              ].map(mimeType => (
                <MenuItem key={mimeType} value={mimeType}>
                  {mimeType}
                </MenuItem>
              ))}
            </TextField>
          </SC.Fieldset>
          <SC.ModalActions>
            <Button onClick={onDiscard}>Discard</Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              endIcon={<SaveIcon />}
              disabled={!isValid || isSubmitting}
            >
              Save
            </Button>
          </SC.ModalActions>
        </Form>
      </SC.Modal>
    </SC.DataSourceItemEditor>
  );
};

const formikConfig: WithFormikConfig<Props, FormValues> = {
  isInitialValid: false,
  mapPropsToValues: ({
    dataSource: {
      dataType = null,
      dataSourceType = null,
      url = '',
      publisherId = '',
      description = '',
      acceptHeaderValue = null
    } = {}
  }: Props) => ({
    dataType,
    dataSourceType,
    url,
    publisherId,
    description,
    acceptHeaderValue
  }),
  handleSubmit: (values, { props: { onSave, dataSource } }) =>
    onSave({ id: dataSource?.id ?? '', ...values }, !!dataSource),
  validationSchema,
  displayName: 'DataSourceItemEditor'
};

export default compose<FC<ExternalProps>>(
  memo,
  withAuth,
  withFormik(formikConfig)
)(DataSourceItemEditor);
