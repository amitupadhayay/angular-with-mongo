import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'common/service/angular-material.module';
import { EmployeeModule } from './employee/employee.module';
import { RetryService } from 'common/service/rxjs-retry';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { AppInterceptorService } from 'common/service/app-interceptor.service';
import { AuthguardService } from 'common/service/authguard.service';

const routes: Routes = [
  {
    path: 'employee',
    loadChildren: () => import('src/app/employee/employee.module').then(mod => mod.EmployeeModule),
    canActivate: [AuthguardService],
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/authetication/login.module').then(mod => mod.LoginModule),
    //canActivate: [AuthGuardService],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('src/app/dashboard/dashboard.module').then(mod => mod.DashboardModule),
    //canActivate: [AuthGuardService],
  },
  {
    path: 'employee',
    loadChildren: () => import('src/app/employee/employee.module').then(mod => mod.EmployeeModule),
    //canActivate: [AuthGuardService],
  },
  {
    path: '',
    loadChildren: () => import('src/app/authetication/login.module').then(mod => mod.LoginModule),
    //canActivate: [AuthGuardService],
  },


];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    EmployeeModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  exports: [
    [RouterModule],
  ],
  providers: [
    //RetryService,
    //DatePipe,
    //HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
