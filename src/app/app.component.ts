import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonService } from 'common/service/common.service';
import { RouteService } from 'common/service/route.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'tebdemo';
  opened: boolean = true;
  appList = [];
  autenticated: boolean = false;
  pageName: string = "";

  constructor(
    private routeService: RouteService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    public toastr: ToastrManager,
    private router: Router,
  ) {
    this.getAppList();
    this.checkAuthentication();

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var url = event.url;
        var urls = url.split("/");
        this.pageName = urls.length >= 2 ? urls[1] : "";
      }
    })

  }

  checkAuthentication() {
    let auth = localStorage.getItem("Token");
    if (auth != undefined && auth != null && auth != "") {
      this.autenticated = true;
    }
    else {
      this.redirectToModule("login");
    }
  }


  getAppList() {
    this.appList.push({ AppCode: "Dashboard", AppName: "Dashboard", url: "dashboard", icon: "dashboard" });
    this.appList.push({ AppCode: "Employee", AppName: "Employee", url: "employee", icon: "contacts" });
    this.appList.push({ AppCode: "EmployeeServer", AppName: "Employee Server", url: "employeeserver", icon: "person" });
    this.appList.push({ AppCode: "EmployeeReactive", AppName: "Employee Reactive", url: "employeereactive", icon: "person" });
  }

  onLogout() {
    this.commonService.logout(localStorage.getItem("Token"))
      .subscribe((response: any) => {
        localStorage.clear();
        this.autenticated = false;
        this.routeService.redirectToURL("login");
        setTimeout(() => {
          window.location.reload();
        }, 50);
      },
        error => {
          this.toastr.errorToastr(error.error.error.message);
        })

  }

  redirectToModule(url) {
    this.routeService.redirectToURL(url);
  }

  getClassName(menu) {
    var className = this.pageName == menu ? "pr-16 pl-16 sidenav-active" : "pr-16 pl-16";
    return className;
  }



}