import { ProductType } from './product.type';
import { ProductCategory } from './product.category';
import { ProductSubcategory } from './product.subcategory';
import { User } from './user';

export class UntaggedUPC {
  untaggedUPCID: number;
  descriptionID: number;
  description: string;
  upcCode: string;
  productSizing: string;
  itemAssignedTo: User;
  itemAssignedBy: number;
  statusID: number;
  productType: ProductType;
  productCategory: ProductCategory;
  productSubCategory: ProductSubcategory;
}
