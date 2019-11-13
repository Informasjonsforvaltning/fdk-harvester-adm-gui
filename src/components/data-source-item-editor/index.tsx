import React, { ChangeEvent, PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Formik, Form, Field, FormikActions } from 'formik';
import * as Yup from 'yup';
import isURL from 'validator/lib/isURL';

import SC from './styled';

import { DataSource } from '../../types';

interface Props {
  dataSource?: DataSource;
  onDiscard: () => void;
  onSave: (dataSource: Omit<DataSource, 'id'>, update: boolean) => void;
}

interface State {
  dataSource: Partial<DataSource>;
}

const dataSourceTypes = {
  'DCAT-AP-NO': 'Datasets (DCAT-AP-NO)',
  'SKOS-AP-NO': 'Concepts (SKOS-AP-NO)'
};

const dataSourceSchema = Yup.object().shape({
  dataSourceType: Yup.string()
    .required('Data source type is required')
    .oneOf(
      Object.keys(dataSourceTypes),
      `Data source type must be one of: ${Object.keys(dataSourceTypes)}`
    ),
  url: Yup.string()
    .required('Data source URL is required')
    .test(
      'url',
      'Data source URL must be valid',
      url => url && isURL(url, { require_tld: false })
    ),
  publisherId: Yup.string()
    .required('Organisation number is required')
    .matches(/^\d{9}$/, 'Organisation number must be a 9-digit value'),
  description: Yup.string(),
  acceptHeaderValue: Yup.string().required('Accept header is required')
});

class DataSourceItemEditor extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      dataSource: {
        dataSourceType: '',
        url: '',
        publisherId: '',
        description: '',
        acceptHeaderValue: ''
      }
    };

    this.closeModal = this.closeModal.bind(this);
    this.saveDataSource = this.saveDataSource.bind(this);
    this.saveDataSource = this.saveDataSource.bind(this);
  }

  private closeModal(): void {
    const { onDiscard } = this.props;
    onDiscard();
  }

  private saveDataSource(
    values: Partial<DataSource>,
    { setSubmitting }: FormikActions<Partial<DataSource>>
  ): void {
    const { onSave, dataSource } = this.props;
    setSubmitting(true);
    onSave(values as any, !!dataSource);
  }

  public render(): JSX.Element {
    const { onDiscard, dataSource: existingDataSource } = this.props;
    const { dataSource } = this.state;
    const handleInputChange = async (
      e: ChangeEvent<any>,
      name: string,
      setFieldValue: any,
      setFieldTouched: any
    ) => {
      e.persist();
      this.setState(({ dataSource: prev }) => ({
        dataSource: {
          ...prev,
          [name]: e.target.value
        }
      }));
      setFieldValue(name, e.target.value);
      setFieldTouched(name);
    };
    return (
      <SC.DataSourceItemEditor>
        <SC.Modal>
          <SC.ModalHeading>Register new data source</SC.ModalHeading>
          <Formik
            initialValues={existingDataSource || dataSource}
            validationSchema={dataSourceSchema}
            isInitialValid={!!existingDataSource}
            onSubmit={this.saveDataSource}
          >
            {({
              isValid,
              isSubmitting,
              errors,
              touched,
              setFieldValue,
              setFieldTouched
            }) => (
              <Form noValidate>
                <SC.Fieldset>
                  <Field
                    select
                    name='dataSourceType'
                    value={
                      (!touched.dataSourceType &&
                        existingDataSource &&
                        existingDataSource.dataSourceType) ||
                      dataSource.dataSourceType
                    }
                    component={TextField}
                    variant='outlined'
                    required
                    label='Data source type'
                    fullWidth
                    error={errors.dataSourceType && touched.dataSourceType}
                    helperText={touched.dataSourceType && errors.dataSourceType}
                    onChange={(e: ChangeEvent<any>) =>
                      handleInputChange(
                        e,
                        'dataSourceType',
                        setFieldValue,
                        setFieldTouched
                      )
                    }
                  >
                    {Object.entries(dataSourceTypes).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field
                    type='text'
                    name='url'
                    defaultValue={existingDataSource && existingDataSource.url}
                    component={TextField}
                    variant='outlined'
                    required
                    label='Data source URL'
                    fullWidth
                    error={errors.url && touched.url}
                    helperText={touched.url && errors.url}
                    onChange={(e: ChangeEvent<any>) =>
                      handleInputChange(
                        e,
                        'url',
                        setFieldValue,
                        setFieldTouched
                      )
                    }
                  />
                  <Field
                    type='text'
                    name='publisherId'
                    defaultValue={
                      existingDataSource && existingDataSource.publisherId
                    }
                    component={TextField}
                    variant='outlined'
                    required
                    label='Organisation number'
                    fullWidth
                    error={errors.publisherId && touched.publisherId}
                    helperText={touched.publisherId && errors.publisherId}
                    onChange={(e: ChangeEvent<any>) =>
                      handleInputChange(
                        e,
                        'publisherId',
                        setFieldValue,
                        setFieldTouched
                      )
                    }
                  />
                  <Field
                    type='text'
                    name='description'
                    defaultValue={
                      existingDataSource && existingDataSource.description
                    }
                    component={TextField}
                    variant='outlined'
                    label='Description'
                    fullWidth
                    multiline
                    rows='5'
                    error={errors.description && touched.description}
                    helperText={touched.description && errors.description}
                    onChange={(e: ChangeEvent<any>) =>
                      handleInputChange(
                        e,
                        'description',
                        setFieldValue,
                        setFieldTouched
                      )
                    }
                  />
                  <Field
                    type='text'
                    name='acceptHeaderValue'
                    defaultValue={
                      existingDataSource && existingDataSource.acceptHeaderValue
                    }
                    component={TextField}
                    variant='outlined'
                    required
                    label='Accept header'
                    fullWidth
                    error={
                      errors.acceptHeaderValue && touched.acceptHeaderValue
                    }
                    helperText={
                      touched.acceptHeaderValue && errors.acceptHeaderValue
                    }
                    onChange={(e: ChangeEvent<any>) =>
                      handleInputChange(
                        e,
                        'acceptHeaderValue',
                        setFieldValue,
                        setFieldTouched
                      )
                    }
                  />
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
            )}
          </Formik>
        </SC.Modal>
      </SC.DataSourceItemEditor>
    );
  }
}

export default DataSourceItemEditor;
