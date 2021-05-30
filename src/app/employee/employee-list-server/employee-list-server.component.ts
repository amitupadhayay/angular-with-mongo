import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DynamicEmployeeMetaData } from 'common/model/common-metadata';
import { BulkEmployeeDeleteMetaData } from 'common/model/employee.metadata';
import { RetryService } from 'common/service/rxjs-retry';
import { ToastrManager } from 'ng6-toastr-notifications';
import { of } from 'rxjs';
import { catchError, retryWhen } from 'rxjs/operators';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeService } from '../employee.service';
import { UploadEmployeeComponent } from '../upload-employee/upload-employee.component';

@Component({
  selector: 'app-employee-list-server',
  templateUrl: './employee-list-server.component.html',
  styleUrls: ['./employee-list-server.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class EmployeeListServerComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  employeeList = [];
  selected = [];
  totalSize: number;
  pageSize: number;
  currentPage: number;
  limitList = [];
  limit: number = 10
  columns = [];
  loading: boolean = false;

  page: DynamicEmployeeMetaData;

  constructor(
    private employeeService: EmployeeService,
    private matDialog: MatDialog,
    public toastr: ToastrManager,
    private retry: RetryService,
  ) {
    this.page = new DynamicEmployeeMetaData();
    this.setDynamic();
  }

  ngOnInit(): void {
    this.getDynamicEmployeeList();
  }

  setDynamic() {
    this.page.limit = 10;
    this.page.count = 0;
    this.page.offset = 0;
    this.page.orderBy = "ModifiedDate";
    this.page.orderDirection = "desc";
  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.getDynamicEmployeeList();
  }

  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    this.page.orderBy = sortInfo.sorts[0].prop;
    this.page.orderDirection = sortInfo.sorts[0].dir;
    this.getDynamicEmployeeList();
  }

  getDynamicEmployeeList() {
    this.loading = true;
    this.employeeService.getDynamicEmployeeList(this.page)
      //.pipe(retryWhen(this.retry.genericRetryStrategy()),
      //catchError(error => of(error)))
      .subscribe((resp: any) => {
        if (resp.error != undefined) {
          this.toastr.errorToastr(resp.error.ExceptionMessage);
        }
        else {
          this.employeeList = resp.EmployeeList;
          this.page.count = resp.Count;
        }
        this.loading = false;
      },
        error => {
          this.loading = false;
          this.toastr.errorToastr('This is not good!', 'Oops!');
        })
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
        this.getDynamicEmployeeList();
      }
    })
  }

  deleteEmployee(employeeId) {
    employeeId = employeeId.toString();
    this.employeeService.deleteEmployee(employeeId)
      .subscribe((resp: any) => {
        this.toastr.successToastr('Employee deleted successfully', 'Success!');
        this.getDynamicEmployeeList();
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
        this.getDynamicEmployeeList();
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
        this.getDynamicEmployeeList();
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