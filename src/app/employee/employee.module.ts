import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { AngularMaterialModule } from 'common/service/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadEmployeeComponent } from './upload-employee/upload-employee.component';
import { EmployeeListServerComponent } from './employee-list-server/employee-list-server.component';
import { EmployeeListReactiveComponent } from './employee-list-reactive/employee-list-reactive.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptorService } from 'common/service/app-interceptor.service';
import { AuthguardService } from 'common/service/authguard.service';

const routes: Routes = [
    {
        path: '',
        component: EmployeeListComponent,
        canActivate: [AuthguardService],
    },
    {
        path: 'employee',
        component: EmployeeListComponent,
        canActivate: [AuthguardService],
    },
    // {
    //     path: 'employeeserver',
    //     component: EmployeeListServerComponent,
    //     //canActivate: [AuthGuardService],
    // },
    // {
    //     path: 'employeereactive',
    //     component: EmployeeListReactiveComponent,
    //     //canActivate: [AuthGuardService],
    // },
    // {
    //     path: 'viewcompany/:id',
    //     component: CompanyViewComponent,
    //     children: [
    //         { path: '', redirectTo: 'highlight', pathMatch: 'full' },
    //         { path: 'highlight', component: CompanyInfoComponent, canActivate: [AuthGuardService] },
    //         { path: 'location', component: CompanyLocationComponent, canActivate: [AuthGuardService] },
    //         { path: 'storyboard', component: VerticalTimelineComponent, canActivate: [AuthGuardService] },
    //     ]
    // }

];

@NgModule({

    declarations: [
        EmployeeListComponent,
        EmployeeFormComponent,
        UploadEmployeeComponent,
        EmployeeListServerComponent,
        EmployeeListReactiveComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        CommonModule,
        FlexLayoutModule,
        NgxDatatableModule,
        ToastrModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    providers: [
      
    ],
    exports: [
        AngularMaterialModule,
        [RouterModule],
    ],
    entryComponents: [
        EmployeeFormComponent,
        UploadEmployeeComponent,
    ]

})
export class EmployeeModule { }