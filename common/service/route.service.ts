import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(
    private router: Router,
  ) { }

  redirectToURL(url) {
    this.router.navigate([url]);
  }

  redirectURLWithId(url, id) {
    this.router.navigate([url + id]);
  }


}
