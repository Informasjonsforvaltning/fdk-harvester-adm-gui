import * as Yup from 'yup';
import isURL from 'validator/lib/isURL';

import { DataType, Standard } from '../../types/enums';

export default Yup.object().shape({
  dataType: Yup.string()
    .required('Data source type is required')
    .oneOf(
      [
        DataType.CONCEPT,
        DataType.DATASET,
        DataType.INFORMATION_MODEL,
        DataType.DATASERVICE
      ],
      'Data source type is not supported'
    ),
  dataSourceType: Yup.string()
    .required('Data standard is required')
    .when('dataType', {
      is: DataType.CONCEPT,
      then: Yup.string()
        .required('Data standard is required')
        .oneOf(
          [Standard.SKOS_AP_NO],
          'Data standard is not supported for concepts'
        )
    })
    .when('dataType', {
      is: DataType.DATASET,
      then: Yup.string()
        .required('Data standard is required')
        .oneOf(
          [Standard.DCAT_AP_NO],
          'Data standar is not supported for datasets'
        )
    })
    .when('dataType', {
      is: DataType.INFORMATION_MODEL,
      then: Yup.string()
        .required('Data standard is required')
        .oneOf(
          [Standard.DCAT_AP_NO],
          'Data standard is not supported for information models'
        )
    })
    .when('dataType', {
      is: DataType.DATASERVICE,
      then: Yup.string()
        .required('Data standard is required')
        .oneOf(
          [Standard.DCAT_AP_NO],
          'Data standard is not supported for data services'
        )
    }),
  url: Yup.string()
    .required('Data source URL is required')
    .test('url', 'Data source URL must be valid', url =>
      isURL(url ?? '', { require_tld: false })
    ),
  publisherId: Yup.string()
    .required('Organisation number is required')
    .matches(/^\d{9}$/, 'Organisation number must be a 9-digit value'),
  description: Yup.string(),
  acceptHeaderValue: Yup.string().required('Accept header is required')
});
