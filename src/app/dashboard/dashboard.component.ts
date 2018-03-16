import { Component, OnInit } from '@angular/core';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { UpctabsComponent } from '../upctabs/upctabs.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
