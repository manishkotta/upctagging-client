import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UPCFilter } from '../modals/upc.filter';
import { User } from '../modals/user';
import { Subject } from 'rxjs';
 
@Injectable()
export class DataTransferService {

  private filterSource = new Subject<UPCFilter>();
  currentFilter = this.filterSource.asObservable();


  private assignUserSource = new Subject<User>();
  currentAssignee = this.assignUserSource.asObservable();

  private approveSaveUPCSource = new Subject<any>();
  approveSavedUPC = this.approveSaveUPCSource.asObservable();

  constructor() { }

  changeInFilter(upcFilter: UPCFilter) {
    this.filterSource.next(upcFilter);
  }

  asigneeClickHndlr(user: User) {
    this.assignUserSource.next(user);
  }

  approveClickHandler() {
    this.approveSaveUPCSource.next();
  }

}
