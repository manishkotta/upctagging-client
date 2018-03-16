import { ProductType } from './product.type';
import { ProductCategory } from './product.category';
import { ProductSubcategory } from './product.subcategory';

export class TaggedUPC {
  descriptionID: number;
  description: string;
  upcCode: string;
  productSizing: string;
  productType: ProductType;
  productCategory: ProductCategory;
  productSubCategory: ProductSubcategory;
}
