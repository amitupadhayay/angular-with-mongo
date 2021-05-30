import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ng6-toastr-notifications';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularMaterialModule } from 'common/service/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DateAdapter } from '@angular/material/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule } from 'angular-calendar';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        //canActivate: [AuthGuardService],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        //canActivate: [AuthGuardService],
    },

];

@NgModule({

    declarations: [
        DashboardComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        CommonModule,
        FlexLayoutModule,        
        ToastrModule.forRoot(),
        RouterModule.forChild(routes),
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        NgxEchartsModule.forRoot({ echarts, }),
    ],
    providers: [        
    ],
    exports: [
        AngularMaterialModule,
        [RouterModule],
    ],
    entryComponents: [
    ]

})
export class DashboardModule { }