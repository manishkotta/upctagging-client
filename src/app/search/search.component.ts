import { Component, OnInit } from '@angular/core';
import { ProductType } from '../modals/product.type';
import { ProductCategory } from '../modals/product.category';
import { ProductSubcategory } from '../modals/product.subcategory';
import { CommonService } from '../upc.tagging.services/common.service';
import { UPCFilter } from '../modals/upc.filter';
import { DataTransferService } from '../upc.tagging.services/data.transfer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  productTypeGroup: ProductType[];
  productCategoryGroup: ProductCategory[];
  productSubcategoryGroup: ProductSubcategory[];

  productTypeSearchGrp: ProductType[];
  productCategorySearchGrp: ProductCategory[];
  productSubcategorySearchGrp: ProductSubcategory[];


  productTypeSelected: ProductType[];
  productCategorySelected: ProductCategory[];
  productSubcategorySelected: ProductSubcategory[];

  productUPC: string;
  productDescription: string;

  constructor(private commonService: CommonService, private dataTrafService: DataTransferService ) { }

  ngOnInit() {

    this.commonService.GetProductType()
      .subscribe(
      res => {
        this.productTypeGroup = res;
      },
      err => {
        console.log(err);
      });

    this.commonService.GetProductCategory()
      .subscribe(
      res => {
        this.productCategoryGroup = res;
      },
      err => {
        console.log(err);
      });

    this.commonService.GetProductSubcategory()
      .subscribe(
      res => {
        this.productSubcategoryGroup = res;
      },
      err => {
        console.log(err)
      });

  }

  typeSearch(event: any) {
    this.productTypeSearchGrp = this.productTypeGroup.filter(s => s.productTypeName.toLowerCase().includes(event.query));
  }

  categorySearch(event: any) {
    this.productCategorySearchGrp = this.productCategoryGroup.filter(s => s.categoryName.toLowerCase().includes(event.query));
  }

  subcategorySearch(event: any) {
    this.productSubcategorySearchGrp = this.productSubcategoryGroup.filter(s => s.subcategoryName.toLowerCase().includes(event.query));
  }

  searchClickhandler(event: any) {

    let upcFilter = new UPCFilter();

    upcFilter.UPCCode = this.productUPC;
    upcFilter.Description = this.productDescription;

    upcFilter.ProductCategory = this.productCategorySelected ? this.productCategorySelected.map(s => s.categoryID) : [];
    upcFilter.ProductSubcategory = this.productSubcategorySelected ? this.productSubcategorySelected.map(s => s.subCategoryID) : [];
    upcFilter.Type = this.productTypeSelected ? this.productTypeSelected.map(s => s.typeID) : [];

    this.dataTrafService.changeInFilter(upcFilter);
  }
}
