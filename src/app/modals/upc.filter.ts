export class UPCFilter {

  UPCCode: string;

  Description: string;

  Type: Array<number> = [];

  ProductCategory: Array<number> = [];

  ProductSubcategory: Array<number> = [];

  ProductSizing: string = "";

  UserID: number = 0;

  First: number;

  Rows: number;

  SortField: string;

  SortOrder: number;

  Status: Array<number> = [];

}
