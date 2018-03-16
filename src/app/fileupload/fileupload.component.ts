import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FileuploadService } from '../upc.tagging.services/fileupload.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  fileUploadForm = new FormGroup({
    uploadFile: new FormControl()
  });

  constructor(private fileUploadService: FileuploadService) { }

  ngOnInit() {
  }

  
  handleFileInput(files: FileList) {
    if (files.length <= 0) return;
    let formData: FormData = new FormData();
    formData.append('Document', files[0]);
    this.fileUploadService.UploadFileToServer(formData);
  }

  handleChooseFileBtnClick(event: any) {
    event.preventDefault();
    let el: HTMLElement = document.getElementById('inputFile') as HTMLElement;
    el.click();
  }

}
