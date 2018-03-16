import { Injectable } from '@angular/core';
import { ProductType } from '../modals/product.type';
import { ProductCategory } from '../modals/product.category';
import { ProductSubcategory } from '../modals/product.subcategory';
import { User } from '../modals/user';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CommonService {

  constructor(private http: HttpClient) { }

  GetProductType(): Observable<ProductType[]>
  {
    console.count("Common");
    return this.http.get<ProductType[]>('http://localhost:51684/api/dashboard/product-type');
    
  }

  GetProductCategory(): Observable<ProductCategory[]> {
    console.count("PC");
    return this.http.get<ProductCategory[]>('http://localhost:51684/api/dashboard/product-category');
  }

  GetProductSubcategory(): Observable<ProductSubcategory[]> {
    return this.http.get<ProductSubcategory[]>('http://localhost:51684/api/dashboard/product-subcategory');
  }

  GetNonAdminUsers(): Observable<User[]> {
    return this.http.get <User[]>('http://localhost:51684/api/dashboard/non-admins');
  }
}
