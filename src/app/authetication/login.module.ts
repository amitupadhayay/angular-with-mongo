import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularMaterialModule } from 'common/service/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
  

];

@NgModule({

    declarations: [
        LoginComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        CommonModule,
        FlexLayoutModule,
        NgxDatatableModule,
        ToastrModule.forRoot(),
        MatMenuModule,
        RouterModule.forChild(routes)
    ],
    providers: [
    ],
    exports: [
        AngularMaterialModule,
        [RouterModule],
    ],
    entryComponents: [
        //LoginComponent
    ]

})
export class LoginModule { }