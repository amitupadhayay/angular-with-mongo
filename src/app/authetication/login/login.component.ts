import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from 'common/service/route.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private routeService: RouteService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public toastr: ToastrManager,
    public router: Router,
    private injector: Injector,
  ) {
    this.showHideNavMenu();
   }

  ngOnInit(): void {
    this.loginForm = this.createForm();
  }

  redirectToEmployee() {
    this.routeService.redirectToURL("/employee");
  }

  createForm() {
    return this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    let uname = this.loginForm.controls.username.value;
    let pwd = this.loginForm.controls.password.value;

    this.loginService.login(uname, pwd)
      .subscribe((response: any) => {
        if (response.Token == "" || response.Token == null) {
          this.toastr.errorToastr('Username or Password is incorrect!', 'Oops!');
        }
        else {
          localStorage.setItem("Token", response.Token);
          this.showHideNavMenu();

          this.routeService.redirectToURL("employee");        

        }
      },
        error => {
          this.toastr.errorToastr('This is not good!', 'Oops!');
        })
  }

  showHideNavMenu() {
    {
      let appComponent = this.injector.get(AppComponent);
      appComponent.checkAuthentication();
    }
  }


}
