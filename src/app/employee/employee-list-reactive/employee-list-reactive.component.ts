import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DynamicEmployeeMetaData } from 'common/model/common-metadata';
import { AddEmployeeMetaData, BulkEmployeeDeleteMetaData, DynamicEmployeeList } from 'common/model/employee.metadata';
import { RetryService } from 'common/service/rxjs-retry';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EMPTY, merge, observable, Observable, of, Subject } from 'rxjs';
import { catchError, map, mergeMap, startWith, switchMap, tap } from 'rxjs/operators';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeService } from '../employee.service';
import { UploadEmployeeComponent } from '../upload-employee/upload-employee.component';

@Component({
  selector: 'app-employee-list-reactive',
  templateUrl: './employee-list-reactive.component.html',
  styleUrls: ['./employee-list-reactive.component.scss']
})
export class EmployeeListReactiveComponent implements OnInit {


  @ViewChild(DatatableComponent) table: DatatableComponent;
  selected = [];
  totalSize: number;
  pageSize: number;
  currentPage: number;
  limitList = [];
  limit: number = 10
  columns = [];
  loading: boolean = false;

  page: DynamicEmployeeMetaData;

  //employeeList$: Observable<AddEmployeeMetaData[]>;
  employeeList$: Observable<DynamicEmployeeList>;
  totalRows$: Observable<number>;

  constructor(
    private employeeService: EmployeeService,
    private matDialog: MatDialog,
    public toastr: ToastrManager,
    private retry: RetryService,
    private http: HttpClient
  ) {
    this.page = new DynamicEmployeeMetaData();
    this.setDynamic();
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  setDynamic() {
    this.page.limit = 10;
    this.page.count = 0;
    this.page.offset = 0;
    this.page.orderBy = "EmployeeId";
    this.page.orderDirection = "desc";
  }

  //  getEmployeeList() {
  //   this.loading = true;
  //   this.employeeList$ = this.employeeService.getEmployeeList();
  // }


  // getEmployeeList() {
  //   this.loading = true;
  //   const observer$ = of(this.employeeService.getEmployeeList());
  //   this.employeeList$ = observer$.pipe(
  //     mergeMap((resp) => {
  //       this.loading = false;
  //       return resp;
  //     }),
  //     // error(err=>{
  //     //   console.log(err);
  //     //   return EMPTY;
  //     // }
  //   )
  // }

  getEmployeeList() {
    this.loading = true;
    const observer$ = of(this.employeeService.getDynamicEmployeeList(this.page));
    this.employeeList$ = observer$.pipe(
      mergeMap((resp) => {
        debugger;
        this.loading = false;
        //var asd = resp.toPromise();
        return resp;
      })
    )
  }


  addEditEmployee(rowData, isEdit) {
    const dialog = this.matDialog.open(EmployeeFormComponent, {
      disableClose: true,
      data: {
        row: rowData,
        isEdit: isEdit,
      }
    })

    dialog.afterClosed().subscribe(result => {
      if (result == true) {
        this.getEmployeeList();
      }
    })
  }

  deleteEmployee(employeeId) {
    employeeId = employeeId.toString();
    this.employeeService.deleteEmployee(employeeId)
      .subscribe((resp: any) => {
        this.toastr.successToastr('Employee deleted successfully', 'Success!');
        this.getEmployeeList();
        this.loading = false;
      },
        error => {
          this.loading = false;
          this.toastr.errorToastr(error.error.ExceptionMessage, 'Oops!');
        })
  }

  uploadEmployee() {
    const dialog = this.matDialog.open(UploadEmployeeComponent, {
      disableClose: true,
      data: {
      }
    })
    dialog.afterClosed().subscribe(result => {
      if (result == true) {
        this.getEmployeeList();
      }
    })
  }

  bulkDeleteEmployee() {
    var empId = [];
    for (let emp of this.selected) {
      empId.push(emp.EmployeeId.toString());
    }
    var bulk = new BulkEmployeeDeleteMetaData();
    bulk.EmployeeId = empId;
    this.loading = true;
    this.employeeService.bulkDeleteEmployee(bulk)
      .subscribe((resp: any) => {
        this.toastr.successToastr('Employee deleted successfully', 'Success!');
        this.getEmployeeList();
        this.selected = [];
      },
        error => {
          this.loading = false;
          this.toastr.errorToastr(error.error.ExceptionMessage, 'Oops!');
        })
  }

  onActivate(event) {
    if (event.type == "click") {
      // if (event.column.prop != undefined && event.column.prop != "CompanyId") {
      //   this.routeService.redirectToURL("company/viewcompany/" + event.row.CompanyId);
      // }
    }
  }

  onSelect(event) {
    this.selected = event.selected;
  }





}