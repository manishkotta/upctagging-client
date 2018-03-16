import { Component, OnInit } from '@angular/core';
import { UPCFilter } from '../modals/upc.filter';
import { TableModule } from 'primeng/table';
import { UntaggedUpcService } from '../upc.tagging.services/untagged-upc.service';
import { UntaggedUPC } from '../modals/upc.untagged';
import { DataTransferService } from '../upc.tagging.services/data.transfer.service';
import { ProductType } from '../modals/product.type';
import { ProductCategory } from '../modals/product.category';
import { ProductSubcategory } from '../modals/product.subcategory';
import { CommonService } from '../upc.tagging.services/common.service';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-savedupc',
  templateUrl: './savedupc.component.html',
  styleUrls: ['./savedupc.component.css']
})
export class SavedupcComponent implements OnInit {

  untaggedUPCColumns: any;
  SavedUPCGroup: UntaggedUPC[];
  totalRecords: number;// Need to update this value
  upcSearchFilter: UPCFilter;

  displayDialog: boolean;

  SavedUPCSelectedGrp: UntaggedUPC[];

  SavedUPCSelectedObj: UntaggedUPC;
  PrevSavedUPCSelectedObj: UntaggedUPC;

  productTypeGroup: ProductType[];
  productCategoryGroup: ProductCategory[];
  productSubcategoryGroup: ProductSubcategory[];

  productTypeSearchGrp: ProductType[];
  productCategorySearchGrp: ProductCategory[];
  productSubcategorySearchGrp: ProductSubcategory[];


  constructor(private _untaggedUpcService: UntaggedUpcService,
    private _dataTransService: DataTransferService,
    private _commonService: CommonService) {


    this.untaggedUPCColumns = [
      { field: 'descriptionID', header: 'Desc ID' },
      { field: 'upcCode', header: 'UPC' },
      { field: 'description', header: 'Description' },
      { field: 'productType', header: 'Type' },
      { field: 'productCategory', header: 'Category' },
      { field: 'productSubCategory', header: 'Sub Category' },
      { field: 'productSizing', header: 'Sizing' }
    ];

    this.SavedUPCGroup = [];

    this.upcSearchFilter = new UPCFilter();
    this._dataTransService.currentFilter.subscribe(upcFilter => {

      var upcTempFilter = { ...upcFilter };
      upcTempFilter.Rows = 100;
      upcTempFilter.First = 0;
      upcTempFilter.Status = [2];
      this.upcSearchFilter = upcTempFilter;
      this.getSavedUPCs(this.upcSearchFilter);

    });

    this._dataTransService.approveSavedUPC.subscribe(
      approveClick => {
        this._untaggedUpcService.ApproveSavedUPC(this.SavedUPCSelectedGrp.map(s => s.untaggedUPCID))
          .subscribe(res => {
            console.log(res);
          }, err => {
            console.log(err);
          });

      },
      err => {

      }); 
  }


  ngOnInit() {

    this.totalRecords = 1000;
    this.GetDropDownValues();
  }

  onSaveUPCEditBtnHndlr(upc: UntaggedUPC) {
    this.SavedUPCSelectedObj = upc;
    this.PrevSavedUPCSelectedObj = { ...this.SavedUPCSelectedObj };
    this.displayDialog = true;
  }

  getSavedUPCs(upcFilter: UPCFilter): void {

    this._untaggedUpcService.GetUntaggedUPCS(upcFilter)
      .subscribe(
      res => {
        this.SavedUPCGroup = res;
      },
      err => {
        console.log(err);
      });
  }

  loadSavedUPCOnScroll(event): void {
    this.upcSearchFilter.First = event.first;
    this.upcSearchFilter.Rows = event.rows;
    this.upcSearchFilter.SortOrder = event.sortOrder;
    this.upcSearchFilter.SortField = event.sortField;
    this.upcSearchFilter.Status = [2];
    this.getSavedUPCs(this.upcSearchFilter);
  }

  GetDropDownValues() {
    this._commonService.GetProductType()
      .subscribe(
      res => {
        this.productTypeGroup = res;
      },
      err => {
        console.log(err);
      });

    this._commonService.GetProductCategory()
      .subscribe(
      res => {
        this.productCategoryGroup = res;
      },
      err => {
        console.log(err);
      });

    this._commonService.GetProductSubcategory()
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

  SavedUPCSave() {
    this._untaggedUpcService.UpdateUntaggedUPC(this.SavedUPCSelectedObj).
      subscribe(res => {
        this.displayDialog = false;
      },
      err => {
        this.displayDialog = false;
        console.log(err);
      }
      );
  }

  SavedUPCCancel() {
    this.AssignObjectWithOutReference(this.PrevSavedUPCSelectedObj, this.SavedUPCSelectedObj);
    this.displayDialog = false;
  }

  AssignObjectWithOutReference(prevObj: any, currObj: any) {
    for (var i in prevObj) {
      if (currObj.hasOwnProperty(i)) {
        if (typeof (currObj[i]) === "object") {
          this.AssignObjectWithOutReference(prevObj[i], currObj[i]);
        } else
          currObj[i] = prevObj[i];
      }
    }
  }
}
