import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class FileuploadService {

  constructor(private http: HttpClient) { }

  UploadFileToServer(formData: FormData) {
    return this.http.post("http://localhost:51684/api/upload-document", formData)
      .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }
}
