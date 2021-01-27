export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export enum Standard {
  DCAT_AP_NO = 'DCAT-AP-NO',
  SKOS_AP_NO = 'SKOS-AP-NO'
}

export enum DataType {
  CONCEPT = 'concept',
  DATASET = 'dataset',
  INFORMATION_MODEL = 'informationmodel',
  DATASERVICE = 'dataservice'
}

export enum MimeType {
  TEXT_TURTLE = 'text/turtle',
  RDF_XML = 'application/rdf+xml',
  RDF_JSON = 'application/rdf+json',
  LD_JSON = 'application/ld+json',
  NTRIPLES = 'application/n-triples',
  N3 = 'text/n3'
}
