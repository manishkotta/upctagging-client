import { Component, OnInit } from '@angular/core';
import { User } from '../modals/user';
import { CommonService } from '../upc.tagging.services/common.service';
import { Message } from 'primeng/components/common/api';
import { DataTransferService } from '../upc.tagging.services/data.transfer.service';
import { CookieService } from 'ngx-cookie-service';
 
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
  msgs: Message[] = [];
  userRole: string;

  constructor(private _commonService: CommonService, private _dataTransferService: DataTransferService, private cookieService: CookieService) {
    this.anchorList = [];
    this.userRole = this.cookieService.get('userRole');
  }

  ngOnInit() {
    this._commonService.GetNonAdminUsers()
      .subscribe(res => {
        this.userGrp = res;
      },
      err => {
        console.log(err);
      });

    if (this.userRole == "Admin") {
      this.anchorList = [
        "Tagged UPCs",
        "Untagged UPCs",
        "Saved UPCs"
      ];
    } else {
      this.anchorList = [
        "Tagged UPCs",
        "Untagged UPCs"
      ];

    }
    this.clicked = this.anchorList[1];
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
