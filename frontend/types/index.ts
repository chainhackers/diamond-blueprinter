export interface IStoragaData {
  logo: string;
  name: string;
  description?: string;
}

export interface IFacetGroup {
  icon: string;
  name: string;
  facets: IFacet[];
}

export interface IFacet {
  name: string | null;
  group: string | null;
  address: string;
  methods: IMethod[];
  storages?: IStoragaData[];
}

export interface IMethod {
  name: string;
  color: string;
}

export interface IPickedElement {
  groupName: string | null;
  name: string | null;
  address: string;
  methods: IMethod[];
}

export interface IPopupData {
  facet: IFacet;
}

export interface ISummaryDataElement {
  address: string;
  group: string;
  methodName: string;
}
export interface ISummaryData {
  add: ISummaryDataElement[];
  remove: ISummaryDataElement[];
  replace: ISummaryDataElement[];
}
