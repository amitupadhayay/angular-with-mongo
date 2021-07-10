import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { UserIdleService } from 'angular-user-idle';
import { CommonService } from 'common/service/common.service';
import { RouteService } from 'common/service/route.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { fromEvent, Observable, timer } from 'rxjs';
import { repeat, takeUntil } from 'rxjs/operators';

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
  displayTimer$: Observable<number>;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  
  constructor(
    private routeService: RouteService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    public toastr: ToastrManager,
    private router: Router,
    private userIdle: UserIdleService,
    private idle: Idle,
    private keepalive: Keepalive
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

    idle.setIdle(20000000);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(2);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    //idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => { 
    //   this.idleState = 'No longer idle.'
    //   console.log(this.idleState);
    //   this.reset();
    // });
    
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      // this.router.navigate(['/']);
    });
    
    // idle.onIdleStart.subscribe(() => {
    //     this.idleState = 'You\'ve gone idle!'
    //     console.log(this.idleState);
    // });
    
    // idle.onTimeoutWarning.subscribe((countdown) => {
    //   this.idleState = 'You will time out in ' + countdown + ' seconds!'
    //   console.log(this.idleState);
    // });

    // sets the ping interval to 15 seconds
    // keepalive.interval(45);

    // keepalive.onPing.subscribe(() => this.lastPing = new Date());

    //this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;  

  }

  // checkIdle(){    

  //   const idleTime$ = timer(0,5000);
  //   const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
  //   const keyup$ = fromEvent<MouseEvent>(document, 'keyup');
  //   const keydown$ = fromEvent<MouseEvent>(document, 'keydown');

  //   this.displayTimer$ = idleTime$.pipe(
  //           takeUntil(mouseMove$),
  // 		      repeat()
  //         );

  //         this.displayTimer$.subscribe((resp)=>{
  //           console.log(resp);
  //           if(resp>3){
  //             this.redirectToLoginPage();
  //           }
  //         })

  // }

  // checkIdle() {
   

  //   this.userIdle.startWatching();

  //   // Start watching when user idle is starting.
  //   this.userIdle.onTimerStart().subscribe(count => console.log(count));

  //   // Start watch when time is up.
  //   this.userIdle.onTimeout().subscribe(() => console.log('Time is up!'));

  // }

  // checkIdle(){
  //   this.idle.setIdle(5000000);
  //   // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
  //   this.idle.setTimeout(10);
  //   // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
  //   this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

  //   this.idle.onIdleEnd.subscribe(() => { 
  //     console.log('No longer idle.');
  //     this.reset();
  //   });
    
  //   this.idle.onTimeout.subscribe(() => {    
  //     console.log('Timed out!');
  //     this.redirectToLoginPage();
  //   });
  // }


  checkAuthentication() {
    //this.autenticated = true;
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
        this.redirectToLoginPage();
      },
        error => {
          this.toastr.errorToastr(error.error.error.message);
        })

  }

  redirectToModule(url) {
    this.routeService.redirectToURL(url);
  }

  getClassName(menu) {
    var className = this.pageName == menu ? "sidenav-active" : "";
    return className;
  }

  redirectToLoginPage() {
    localStorage.clear();
    this.autenticated = false;
    this.routeService.redirectToURL("login");
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }



}