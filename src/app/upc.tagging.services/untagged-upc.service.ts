import { Injectable } from '@angular/core';
import { UPCFilter } from '../modals/upc.filter';
import { UntaggedUPC } from '../modals/upc.untagged';
import { User } from '../modals/user';
import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';

import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';


@Injectable()
export class UntaggedUpcService {

  constructor(private http: HttpClient) { }

  GetUntaggedUPCS(filter: UPCFilter): Observable<UntaggedUPC[]> {
    console.log("UnTagged UPC");
    const headers = new HttpHeaders().set('content-type', 'application-json');

    return this.http.post<UntaggedUPC[]>('http://localhost:51684/api/dashboard/untagged-upc', filter);
  }

  UpdateUntaggedUPC(upc: UntaggedUPC): Observable<UntaggedUPC> {
    
    const headers = new HttpHeaders().set('content-type', 'application-json');
    return this.http.post<UntaggedUPC>('http://localhost:51684/api/dashboard/update-untagged-upc', upc);
  }

  AssignUntaggedUPCToUser(untaggedUPCIDs: number[], user: User) {
    let headers = new HttpHeaders().set('content-type', 'application-json');
    return this.http.post('http://localhost:51684/api/dashboard/assign-untagged-upc', { 'untaggedUPCIDs': untaggedUPCIDs, 'user': user });
  }

  ApproveSavedUPC(savedUPC: number[]) {
    return this.http.post('http://localhost:51684/api/dashboard/approve-saved-upc', savedUPC);
  }

}
