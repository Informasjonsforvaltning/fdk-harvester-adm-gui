import React, { memo, FC, useEffect, useRef, MutableRefObject } from 'react';

import { compose } from 'redux';
import { withFormik, FormikProps, WithFormikConfig } from 'formik';
import FocusTrap from 'focus-trap-react';

import Button, { Variant } from '@fellesdatakatalog/button';

import { withAuth } from '../../providers/auth';
import { Auth } from '../../lib/auth/auth';

import CloseIcon from '../../images/close-icon.svg';

import SC from './styled';

import validationSchema from './validation-schema';

import { DataSource, Organization } from '../../types';
import { Standard, DataType, MimeType } from '../../types/enums';

import withOrganizations from '../with-organizations';

interface FormValues extends Omit<DataSource, 'id'> {}

interface ExternalProps {
  dataSource?: Partial<DataSource>;
  onDiscard: () => void;
  onSave: (dataSource: DataSource, update: boolean) => void;
}

interface Props extends ExternalProps, FormikProps<FormValues> {
  authService: Auth;
  organizations: Organization[];
}

const DataSourceItemEditor: FC<Props> = ({
  onDiscard,
  values,
  isValid,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  authService,
  organizations
}) => {
  const hasSystemAdminPermission = authService.hasSystemAdminPermission();
  const hasOrganizationAdminPermissions = authService.hasOrganizationAdminPermissions();

  const datatTypeOptions = [
    { value: DataType.CONCEPT, label: 'Begrep' },
    { value: DataType.DATASET, label: 'Datasett' },
    { value: DataType.INFORMATION_MODEL, label: 'Informasjonsmodell' },
    { value: DataType.DATASERVICE, label: 'API' },
    { value: DataType.PUBLIC_SERVICE, label: 'Tjeneste' }
  ];

  const datatSourceTypeOptions = [
    { value: Standard.SKOS_AP_NO, label: 'SKOS-AP-NO' },
    { value: Standard.DCAT_AP_NO, label: 'DCAT-AP-NO' },
    { value: Standard.CPSV_AP_NO, label: 'CPSV-AP-NO' }
  ];

  const formatOptions = [
    { value: MimeType.TEXT_TURTLE, label: 'Turtle' },
    { value: MimeType.RDF_XML, label: 'RDF/XML' },
    { value: MimeType.RDF_JSON, label: 'RDF/JSON' },
    { value: MimeType.LD_JSON, label: 'JSON-LD' },
    { value: MimeType.NTRIPLES, label: 'N-Triples' },
    { value: MimeType.N3, label: 'N3' }
  ];

  const dataSourceItemEditorRef: MutableRefObject<any> = useRef();

  const publisherOptions = organizations
    .filter(({ organizationId }) =>
      authService.hasOrganizationAdminPermission(organizationId)
    )
    .map(({ organizationId, name }) => ({
      value: organizationId,
      label: `${name} (${organizationId})`
    }));

  const onChangeField = (fieldName: string, option: any) => {
    setFieldValue(fieldName, option?.value);
  };

  const filterDataSourceType = ({ value }: { value: Standard }) => {
    switch (values.dataType) {
      case DataType.CONCEPT:
        return [Standard.SKOS_AP_NO].find(type => value === type);
      case DataType.DATASET:
        return [Standard.DCAT_AP_NO].find(type => value === type);
      case DataType.INFORMATION_MODEL:
        return [Standard.DCAT_AP_NO].find(type => value === type);
      case DataType.DATASERVICE:
        return [Standard.DCAT_AP_NO].find(type => value === type);
      case DataType.PUBLIC_SERVICE:
        return [Standard.CPSV_AP_NO].find(type => value === type);
      default:
        return true;
    }
  };

  useEffect(() => {
    if (
      !values.publisherId &&
      hasOrganizationAdminPermissions &&
      !hasSystemAdminPermission
    ) {
      values.publisherId = publisherOptions[0]?.value;
    }
  }, []);

  return (
    <FocusTrap>
      <SC.DataSourceItemEditor ref={dataSourceItemEditorRef}>
        <SC.Modal>
          <SC.ModalHeading>
            <span>
              {values.dataSourceType
                ? 'Rediger datakilde'
                : 'Registrer ny datakilde'}
            </span>
            <SC.CloseButton type='button' onClick={onDiscard}>
              <CloseIcon />
            </SC.CloseButton>
          </SC.ModalHeading>
          <form onSubmit={handleSubmit}>
            <SC.FieldSet>
              <SC.FieldHeader>
                <div>
                  <h2>Utgiver</h2>
                  <SC.RequiredLabel>Obligatorisk</SC.RequiredLabel>
                </div>
                <div>Velg organisasjonen som eier datakilden.</div>
              </SC.FieldHeader>

              {hasOrganizationAdminPermissions && !hasSystemAdminPermission ? (
                <SC.Select
                  options={publisherOptions}
                  isClearable={false}
                  name='publisherId'
                  onChange={(option: any) =>
                    onChangeField('publisherId', option)
                  }
                  defaultValue={publisherOptions[0]}
                  value={
                    publisherOptions &&
                    publisherOptions.find(
                      option => option?.value === values.publisherId
                    )
                  }
                />
              ) : (
                <input
                  type='text'
                  name='publisherId'
                  placeholder='F.eks. 910244132'
                  value={values.publisherId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              )}
              <SC.ErrorMessage name='publisherId' component='div' />
            </SC.FieldSet>
            <SC.FieldSetShort>
              <SC.FieldHeader>
                <div>
                  <h2>Katalog</h2>
                  <SC.RequiredLabel>Obligatorisk</SC.RequiredLabel>
                </div>
                <div>Velg katalog datakilden hører til.</div>
              </SC.FieldHeader>
              <SC.Select
                options={datatTypeOptions}
                isClearable={false}
                name='dataType'
                value={
                  datatTypeOptions &&
                  datatTypeOptions.find(
                    option => option?.value === values.dataType
                  )
                }
                onChange={(option: any) => onChangeField('dataType', option)}
              />
              <SC.ErrorMessage name='dataType' component='div' />
            </SC.FieldSetShort>
            <SC.FieldSetShort>
              <SC.FieldHeader>
                <div>
                  <h2>Datakildetype</h2>
                  <SC.RequiredLabel>Obligatorisk</SC.RequiredLabel>
                </div>
                <div>Velg spesifikasjon for datakilden.</div>
              </SC.FieldHeader>
              <SC.Select
                options={datatSourceTypeOptions.filter(filterDataSourceType)}
                isClearable={false}
                name='dataSourceType'
                onChange={(option: any) =>
                  onChangeField('dataSourceType', option)
                }
                value={
                  datatSourceTypeOptions
                    ? datatSourceTypeOptions.find(
                        option => option?.value === values.dataSourceType
                      )
                    : datatSourceTypeOptions[0]
                }
              />
              <SC.ErrorMessage name='dataSourceType' component='div' />
            </SC.FieldSetShort>
            <SC.FieldSetShort>
              <SC.FieldHeader>
                <div>
                  <h2>Format</h2>
                  <SC.RequiredLabel>Obligatorisk</SC.RequiredLabel>
                </div>
                <div>Velg formatet til datakilden (HTTP Content-Type).</div>
              </SC.FieldHeader>
              <SC.Select
                options={formatOptions}
                isClearable={false}
                name='acceptHeaderValue'
                onChange={(option: any) =>
                  onChangeField('acceptHeaderValue', option)
                }
                value={
                  formatOptions
                    ? formatOptions.find(
                        option => option?.value === values.acceptHeaderValue
                      )
                    : formatOptions[0]
                }
              />
              <SC.ErrorMessage name='acceptHeaderValue' component='div' />
            </SC.FieldSetShort>
            <SC.FieldSet>
              <SC.FieldHeader>
                <div>
                  <h2>Navn på datakilde</h2>
                  <SC.RequiredLabel>Obligatorisk</SC.RequiredLabel>
                </div>
                <div>Beskriv kort datakilden.</div>
              </SC.FieldHeader>
              <input
                type='text'
                name='description'
                placeholder='F.eks. Datakatalog for Ramsund og Rognad'
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <SC.ErrorMessage name='description' component='div' />
            </SC.FieldSet>
            <SC.FieldSet>
              <SC.FieldHeader>
                <div>
                  <h2>URL til datakilde</h2>
                  <SC.RequiredLabel>Obligatorisk</SC.RequiredLabel>
                </div>
                <div>
                  Oppgi url-en til datakilden. Husk at formatet (Content-Type)
                  må komme overens.
                </div>
              </SC.FieldHeader>
              <input
                type='text'
                name='url'
                placeholder='F.eks. https://mitt.domene.no/eksempel.ttl'
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <SC.ErrorMessage name='url' component='div' />
            </SC.FieldSet>

            <SC.ModalActions>
              <Button
                type='submit'
                variant={Variant.PRIMARY}
                disabled={!isValid || isSubmitting}
              >
                Lagre
              </Button>
              <SC.DiscardButton variant={Variant.TERTIARY} onClick={onDiscard}>
                Avbryt
              </SC.DiscardButton>
            </SC.ModalActions>
          </form>
        </SC.Modal>
      </SC.DataSourceItemEditor>
    </FocusTrap>
  );
};

const formikConfig: WithFormikConfig<Props, FormValues> = {
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
  validateOnMount: false,
  displayName: 'DataSourceItemEditor'
};

export default compose<FC<ExternalProps>>(
  memo,
  withAuth,
  withFormik(formikConfig),
  withOrganizations
)(DataSourceItemEditor);
