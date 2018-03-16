import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'app-untaggedupc',
  templateUrl: './untaggedupc.component.html',
  styleUrls: ['./untaggedupc.component.css']
})
export class UntaggedupcComponent implements OnInit, OnDestroy {

  untaggedUPCColumns: any;
  UntaggedUPCGroup: UntaggedUPC[];
  totalRecords: number;// Need to update this value
  upcSearchFilter: UPCFilter;

  displayDialog: boolean;

  UntaggedUPCSelectedGrp: UntaggedUPC[];

  UntaggedUPCSelectedObj: UntaggedUPC;
  PrevUntaggedUPCSelectedObj: UntaggedUPC;

  productTypeGroup: ProductType[];
  productCategoryGroup: ProductCategory[];
  productSubcategoryGroup: ProductSubcategory[];

  productTypeSearchGrp: ProductType[];
  productCategorySearchGrp: ProductCategory[];
  productSubcategorySearchGrp: ProductSubcategory[];

  isPostBack: boolean;

  constructor(private _unntaggedUpcService: UntaggedUpcService,
    private _dataTransferService: DataTransferService,
    private _commonService: CommonService) {

    this.isPostBack = false;

    this.untaggedUPCColumns = [
      { field: 'descriptionID', header: 'Desc ID' },
      { field: 'upcCode', header: 'UPC' },
      { field: 'description', header: 'Description' },
      { field: 'productType', header: 'Type' },
      { field: 'productCategory', header: 'Category' },
      { field: 'productSubCategory', header: 'Sub Category' },
      { field: 'productSizing', header: 'Sizing' },
      { field: 'itemAssignedTo', header: 'Assigned To' }
    ];

    this.UntaggedUPCGroup = [];
    this.totalRecords = 0;
    this.upcSearchFilter = new UPCFilter();
    
    this.UntaggedUPCSelectedGrp = [];

    this.UntaggedUPCSelectedObj = new UntaggedUPC();
    this.PrevUntaggedUPCSelectedObj = new UntaggedUPC();

    this.productTypeGroup = [];
    this.productCategoryGroup = [];
    this.productSubcategoryGroup = [];

    this.productTypeSearchGrp = [];
    this.productCategorySearchGrp = [];
    this.productSubcategorySearchGrp = [];


      this._dataTransferService.currentFilter.subscribe(upcFilter => {

        let upcTempFilter = { ...upcFilter };

        upcTempFilter.Rows = 100;
        upcTempFilter.First = 0;
        this.upcSearchFilter = upcTempFilter;
        this.getUntaggedUPCs(this.upcSearchFilter);

      });

      this._dataTransferService.currentAssignee.subscribe(
        assignee => {
          this._unntaggedUpcService.AssignUntaggedUPCToUser(this.UntaggedUPCSelectedGrp.map(s => s.untaggedUPCID), assignee)
            .subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            });
        },
        err => {
          console.log(err);
        });



  }

  ngOnInit() {

    this.totalRecords = 1000;
   
    this.GetDropDownValues();
  }

  ngOnDestroy() {
    
  }

  getUntaggedUPCs(upcFilter: UPCFilter): void {

    this._unntaggedUpcService.GetUntaggedUPCS(upcFilter)
      .subscribe(
      res => {
        this.UntaggedUPCGroup = res;
      },
      err => {
        console.log(err);
      });
  }

  loadUntaggedUPCOnScroll(event): void {
    this.upcSearchFilter.First = event.first;
    this.upcSearchFilter.Rows = event.rows;
    this.upcSearchFilter.SortOrder = event.sortOrder;
    this.upcSearchFilter.SortField = event.sortField;
    this.getUntaggedUPCs(this.upcSearchFilter);
  }

  onUntaggedUPCEditBtnHndlr(upc: UntaggedUPC) {
    this.UntaggedUPCSelectedObj = upc;
    this.PrevUntaggedUPCSelectedObj = { ...this.UntaggedUPCSelectedObj };
    this.displayDialog = true;
  }

  check(checked) {
    console.log(checked);
    console.log(this.UntaggedUPCSelectedGrp);
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

  UntaggedUPCSave() {
    this._unntaggedUpcService.UpdateUntaggedUPC(this.UntaggedUPCSelectedObj).
      subscribe(res => {
        this.displayDialog = false;
      },
      err => {
        this.displayDialog = false;
        console.log(err);
      }
      );
  }

  UntaggedUPCCancel() {
    this.AssignObjectWithOutReference(this.PrevUntaggedUPCSelectedObj, this.UntaggedUPCSelectedObj);
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
