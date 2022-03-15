import * as Yup from 'yup';
import isURL from 'validator/lib/isURL';

import { DataType, Standard } from '../../types/enums';

export default Yup.object().shape({
  dataType: Yup.string()
    .nullable()
    .required('Katalog er obligatorisk')
    .oneOf(
      [
        null,
        DataType.CONCEPT,
        DataType.DATASET,
        DataType.INFORMATION_MODEL,
        DataType.DATASERVICE,
        DataType.PUBLIC_SERVICE
      ],
      'Katalog er ugyldig'
    ),
  dataSourceType: Yup.string()
    .nullable()
    .required('Datakildetype er obligatorisk')
    .when('dataType', {
      is: DataType.CONCEPT,
      then: Yup.string()
        .nullable()
        .required('Datakildetype er obligatorisk')
        .oneOf(
          [null, Standard.SKOS_AP_NO, Standard.TBX],
          `Spesifikasjonen er ikke støttet av begrepskatalog`
        )
    })
    .when('dataType', {
      is: DataType.DATASET,
      then: Yup.string()
        .nullable()
        .required('Datakildetype er obligatorisk')
        .oneOf(
          [null, Standard.DCAT_AP_NO],
          `Spesifikasjonen er ikke støttet av datasettkatalog`
        )
    })
    .when('dataType', {
      is: DataType.INFORMATION_MODEL,
      then: Yup.string()
        .nullable()
        .required('Datakildetype er obligatorisk')
        .oneOf(
          [null, Standard.DCAT_AP_NO],
          'Spesifikasjonen er ikke støttet av informasjonsmodellkatalog'
        )
    })
    .when('dataType', {
      is: DataType.DATASERVICE,
      then: Yup.string()
        .nullable()
        .required('Datakildetype er obligatorisk')
        .oneOf(
          [null, Standard.DCAT_AP_NO],
          'Spesifikasjonen er ikke støttet av API-katalog'
        )
    })
    .when('dataType', {
      is: DataType.PUBLIC_SERVICE,
      then: Yup.string()
        .nullable()
        .required('Datakildetype er obligatorisk')
        .oneOf(
          [null, Standard.CPSV_AP_NO],
          'Spesifikasjonen er ikke støttet av tjenestekatalog'
        )
    }),
  url: Yup.string()
    .nullable()
    .required('URL til datakilde er obligatorisk')
    .test('url', 'URL for datakilde er ugyldig', url => isURL(url ?? '')),
  publisherId: Yup.string()
    .nullable()
    .required('Utgiver er obligatorisk')
    .matches(/^\d{9}$/, 'Organisasjonsnummeret til utgiver er ugyldig'),
  description: Yup.string().required('Navn på datakilde er obligatorisk'),
  acceptHeaderValue: Yup.string().nullable().required('Format er obligatorisk'),
  authHeader: Yup.object()
    .nullable()
    .shape({
      name: Yup.string().required('Autentisering header navn er obligatorisk'),
      value: Yup.string().required('Autentisering header verdi er obligatorisk')
    })
});
