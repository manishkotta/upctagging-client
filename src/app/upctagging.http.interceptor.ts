
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UpctaggingHttpInterceptor {

  constructor(private cookieService: CookieService) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //console.log("intercepted request ... ");

    // Clone the request to add the new header.
    var authToken = localStorage.getItem('auth_token');
    const authReq = req.clone({ headers: req.headers.set("Authorization", `Bearer ${authToken}`) });

    //console.log(authReq,"Sending request with new header now ...");

    //send the newly created request
    return next.handle(authReq)
      .catch((error, caught) => {
        //intercept the respons error and displace it to the console
        console.log("Error Occurred");
        console.log(error);
        //return the error to the method that called it
        return Observable.throw(error);
      }) as any;
  }

}
