import { Component, OnInit } from '@angular/core';
import { User } from '../modals/user';
import { CommonService } from '../upc.tagging.services/common.service';
import { Message } from 'primeng/components/common/api';
import { DataTransferService } from '../upc.tagging.services/data.transfer.service';
 
@Component({
  selector: 'app-upctabs',
  templateUrl: './upctabs.component.html',
  styleUrls: ['./upctabs.component.css']
})
export class UpctabsComponent implements OnInit {

  anchorList: any;
  clicked: any;
  userGrp: User[];
  assignee: User;
  resutls: User[];
  msgs: Message[] =[];

  constructor(private _commonService: CommonService, private _dataTransferService: DataTransferService) {
    this.anchorList = [
      "Tagged UPCs",
      "Untagged UPCs",
      "Saved UPCs"
    ];

    this.clicked = this.anchorList[1];

  }

  ngOnInit() {
    this._commonService.GetNonAdminUsers()
      .subscribe(res => {
        this.userGrp = res;
      },
      err => {
        console.log(err);
      });
  }

  SearchUser(event: any) {
    this.resutls = this.userGrp.filter(s => s.name.toLowerCase().includes(event.query));  
  }

  AssingeeClickHndlr(event: any) {
    if (!this.assignee) return this.msgs.push({ severity: 'error', summary: 'Error message', detail: 'Assignee not selected.' });
    this._dataTransferService.asigneeClickHndlr(this.assignee);
  }

  ApproveClickHndlr(event: any) {
    this._dataTransferService.approveClickHandler();
  }
 
}
