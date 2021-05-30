import { Injectable } from '@angular/core';
import { RouteService } from './route.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(
    public routeService: RouteService,
  ) { }

  canActivate(): boolean {
    const token = localStorage.getItem('Token');
    if (token == null || token == undefined) {
      localStorage.clear();
      this.routeService.redirectToURL('login');
      return false;
    }
    return true;
  }


}
