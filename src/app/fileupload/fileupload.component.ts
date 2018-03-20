import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FileuploadService } from '../upc.tagging.services/fileupload.service';
import { DataTransferService } from '../upc.tagging.services/data.transfer.service';
import { UPCFilter } from '../modals/upc.filter';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  fileName: string;

  fileUploadForm = new FormGroup({
    uploadFile: new FormControl()
  });

  constructor(private fileUploadService: FileuploadService, private dataTransferService: DataTransferService)
  {
    this.fileName = "No File Chosen";
  }

  ngOnInit() {
  }

  
  handleFileInput(files: FileList) {
    if (files.length <= 0) return;
    this.fileName = files[0].name;
    let formData: FormData = new FormData();
    formData.append('Document', files[0]);
    this.fileUploadService.UploadFileToServer(formData).subscribe(res => {
      if (res === true) {
        let upcFilter = new UPCFilter();
        upcFilter.First = 0;
        upcFilter.Rows = 100;
        this.dataTransferService.changeInFilter(upcFilter);
      }
    },
     err => {
       console.log(err);
      });
  }

  handleChooseFileBtnClick(event: any) {
    event.preventDefault();
    let el: HTMLElement = document.getElementById('inputFile') as HTMLElement;
    el.click();
  }

}
