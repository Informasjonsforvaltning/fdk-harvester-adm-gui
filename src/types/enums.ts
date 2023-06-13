export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export enum Standard {
  DCAT_AP_NO = 'DCAT-AP-NO',
  SKOS_AP_NO = 'SKOS-AP-NO',
  TBX = 'TBX',
  CPSV_AP_NO = 'CPSV-AP-NO',
  ModellDCAT_AP_NO = 'ModellDCAT-AP-NO'
}

export enum DataType {
  CONCEPT = 'concept',
  DATASET = 'dataset',
  INFORMATION_MODEL = 'informationmodel',
  DATASERVICE = 'dataservice',
  PUBLIC_SERVICE = 'publicService'
}

export enum MimeType {
  TEXT_TURTLE = 'text/turtle',
  RDF_XML = 'application/rdf+xml',
  RDF_JSON = 'application/rdf+json',
  LD_JSON = 'application/ld+json',
  NTRIPLES = 'application/n-triples',
  N3 = 'text/n3',
  TBX3 = 'application/x-tbx'
}

export enum Shapes {
  DCAT_AP_NO_V1 = 'https://raw.githubusercontent.com/Informasjonsforvaltning/dcat-ap-no/v1.1/shacl/dcat-ap_shacl_shapes_1.1.ttl',
  DCAT_AP_NO_V2 = 'https://raw.githubusercontent.com/Informasjonsforvaltning/dcat-ap-no/v2/shacl/DCAT-AP-NO-shacl_shapes_2.00.ttl'
}
