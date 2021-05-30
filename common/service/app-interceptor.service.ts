import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouteService } from './route.service';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService {

  Token: string = "";

  constructor(
    public toastr: ToastrManager,
    private routeService: RouteService,
  ) {
    // var tokenData = localStorage.getItem("Token")
    // if (tokenData != null) {
    //   this.Token = localStorage.getItem("Token").toString();
    // }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    var tokenData = localStorage.getItem("Token")
    if (tokenData != null) {
      this.Token = localStorage.getItem("Token").toString();
    }
    const headers = new HttpHeaders({

      'Token': this.Token,
    })

    const clone = request.clone({
      headers: headers,
    })

    return next.handle(clone)
      .pipe(
        //catchError(this.handleError)
        catchError((err: any) => {
          if (err.status == 401 || err.error == "0") {
            if (err instanceof HttpErrorResponse) {
              this.toastr.errorToastr("You are not authorized.Please contact to system Admin", "Oops");
              localStorage.clear();
              this.routeService.redirectToURL("login");
              setTimeout(() => {
                window.location.reload()
              }, 100);
            }
          }
          //return of(err);
          return throwError(err);
        })

      );
  }


  handleError(error: HttpErrorResponse) {
    console.log(error);

    return throwError(error);

  }


}
