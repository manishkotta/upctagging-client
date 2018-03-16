import { Injectable } from '@angular/core';
import { TaggedUPC } from '../modals/upc.tagged';
import { UPCFilter } from '../modals/upc.filter';
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
export class TaggedUpcService {

  constructor(private http: HttpClient) { }

  GetTaggedUPCS(filter: UPCFilter): Observable<TaggedUPC[]> {
    console.log("UnTagged UPC");
    const headers = new HttpHeaders().set('content-type', 'application-json');

    filter.UserID = 1764;

    return this.http.post<TaggedUPC[]>('http://localhost:51684/api/dashboard/tagged-upc', filter);
  }

}
