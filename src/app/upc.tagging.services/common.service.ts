import { Injectable } from '@angular/core';
import { ProductType } from '../modals/product.type';
import { ProductCategory } from '../modals/product.category';
import { ProductSubcategory } from '../modals/product.subcategory';
import { User } from '../modals/user';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CommonService {


  productTypeGrp: Observable<ProductType[]>;
  productCategoryGrp: Observable<ProductCategory[]>;
  productSubcategoryGrp: Observable<ProductSubcategory[]>;

  constructor(private http: HttpClient) { }

  GetProductType(): Observable<ProductType[]>
  {  
    if (this.productTypeGrp === undefined) {
      this.productTypeGrp = this.http.get<ProductType[]>('http://localhost:51684/api/dashboard/product-type').publishReplay(1).refCount();
      return this.productTypeGrp;
    }
    else
      return this.productTypeGrp;
  }

  GetProductCategory(): Observable<ProductCategory[]> {
    if (this.productCategoryGrp === undefined) {
      this.productCategoryGrp = this.http.get<ProductCategory[]>('http://localhost:51684/api/dashboard/product-category').publishReplay(1).refCount();
      return this.productCategoryGrp;
    }
    else 
      return this.productCategoryGrp;
  }

  GetProductSubcategory(): Observable<ProductSubcategory[]> {
    if (this.productSubcategoryGrp === undefined) {
      this.productSubcategoryGrp = this.http.get<ProductSubcategory[]>('http://localhost:51684/api/dashboard/product-subcategory').publishReplay(1).refCount();
      return this.productSubcategoryGrp;
    }
    else
      return this.productSubcategoryGrp;
  }

  GetNonAdminUsers(): Observable<User[]> {
    return this.http.get <User[]>('http://localhost:51684/api/dashboard/non-admins');
  }

  CheckUserIsAuthorized(): Observable<any> {
    return this.http.get<any>('');
  }
}
