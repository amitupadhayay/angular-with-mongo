import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'common/service/common.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-upload-employee',
  templateUrl: './upload-employee.component.html',
  styleUrls: ['./upload-employee.component.scss']
})
export class UploadEmployeeComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  buttonOptions: MatProgressButtonOptions;

  constructor(
    private employeeService: EmployeeService,
    public toastr: ToastrManager,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<UploadEmployeeComponent>,
  ) {
    this.buttonOptions = this.commonService.getButtonOptions("upload Employee", "cloud_upload");
  }

  ngOnInit(): void {
  }

  // uploadEmployeeFromExcel() {
  //   this.buttonOptions = this.commonService.savingButton(this.buttonOptions);
  //   let formData = new FormData();
  //   formData.append('file', this.fileInput.nativeElement.files[0])

  //   this.employeeService.uploadEmployeeExcel(formData)
  //     .subscribe(result => {
  //       this.dialogRef.close(result);
  //     },
  //       error => {
  //         this.buttonOptions = this.commonService.disableButton(this.buttonOptions);
  //         this.toastr.errorToastr(error.error.ExceptionMessage);
  //       });
  // }

  uploadEmployeeFromExcel() {
    this.buttonOptions = this.commonService.savingButton(this.buttonOptions);
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0])

    this.employeeService.uploadEmployeeExcel(formData)
      .subscribe((event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress: {
            let progress = Math.round(event.loaded * 100 / event.total);
            break;
          }
          case HttpEventType.Response: {
            this.dialogRef.close(true);
            return event;
           
          }
        }
      },
        error => {
          this.buttonOptions = this.commonService.getButtonOptions("Save Employee", "save");
          this.toastr.errorToastr(error.error.ExceptionMessage, 'Oops!');
        })
  }

  closePopup() {
    this.dialogRef.close(false);
  }



}
