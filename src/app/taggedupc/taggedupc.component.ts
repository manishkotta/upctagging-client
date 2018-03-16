import { Component, OnInit } from '@angular/core';
import { UPCFilter } from '../modals/upc.filter';
import { TableModule } from 'primeng/table';
import { TaggedUpcService } from '../upc.tagging.services/tagged-upc.service';
import { TaggedUPC } from '../modals/upc.tagged';
import { DataTransferService } from '../upc.tagging.services/data.transfer.service';
import { ProductType } from '../modals/product.type';
import { ProductCategory } from '../modals/product.category';
import { ProductSubcategory } from '../modals/product.subcategory';
import { CommonService } from '../upc.tagging.services/common.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-taggedupc',
  templateUrl: './taggedupc.component.html',
  styleUrls: ['./taggedupc.component.css']
})
export class TaggedupcComponent implements OnInit {

  TaggedUPCColumns: any;
  TaggedUPCGroup: TaggedUPC[];
  totalRecords: number;// Need to update this value
  upcSearchFilter: UPCFilter;

  displayDialog: boolean;


  productTypeGroup: ProductType[];
  productCategoryGroup: ProductCategory[];
  productSubcategoryGroup: ProductSubcategory[];

  productTypeSearchGrp: ProductType[];
  productCategorySearchGrp: ProductCategory[];
  productSubcategorySearchGrp: ProductSubcategory[];

  constructor(private _taggedUpcService: TaggedUpcService,
    private _dataTransService: DataTransferService,
    private _commonService: CommonService) {

    this.TaggedUPCColumns = [
      { field: 'descriptionID', header: 'Desc ID' },
      { field: 'upcCode', header: 'UPC' },
      { field: 'description', header: 'Description' },
      { field: 'productType', header: 'Type' },
      { field: 'productCategory', header: 'Category' },
      { field: 'productSubCategory', header: 'Sub Category' },
      { field: 'productSizing', header: 'Sizing' }
    ];

    this.upcSearchFilter = new UPCFilter();
    this.upcSearchFilter.First = 0;
    this.upcSearchFilter.Rows = 100;

    this._dataTransService.currentFilter.subscribe(upcFilter => {

      let upcTempFilter = { ...upcFilter };

      upcTempFilter.Rows = 100;
      upcTempFilter.First = 0;
      this.upcSearchFilter = upcTempFilter;
      this.getTaggedUPCs(this.upcSearchFilter);

    });


  }

  ngOnInit() {
   
    this.totalRecords = 1000;

  }


  getTaggedUPCs(upcFilter: UPCFilter): void {
    this._taggedUpcService.GetTaggedUPCS(upcFilter)
      .subscribe(
      res => {
        this.TaggedUPCGroup = res;
      },
      err => {
        console.log(err);
      });
  }

  loadTaggedUPCOnScroll(event:any) :void {
    this.upcSearchFilter.First = event.first;
    this.upcSearchFilter.Rows = event.rows;
    this.upcSearchFilter.SortOrder = event.sortOrder;
    this.upcSearchFilter.SortField = event.sortField;
    this.getTaggedUPCs(this.upcSearchFilter);
  }

}
