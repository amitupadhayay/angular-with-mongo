import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEmployeeMetaData } from 'common/model/employee.metadata';
import { CommonService } from 'common/service/common.service';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm: FormGroup;
  headerName: string = "Add Employee";
  addEmployeeMetaData: AddEmployeeMetaData;
  row: AddEmployeeMetaData;
  buttonOptions: MatProgressButtonOptions;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    public toastr: ToastrManager,
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private commonService: CommonService,
  ) {
    this.addEmployeeMetaData = new AddEmployeeMetaData();
    this.row = new AddEmployeeMetaData();
    this.buttonOptions = this.commonService.getButtonOptions("Save Employee", "save");
  }

  ngOnInit(): void {
    this.employeeForm = this.createEmployeeForm();
    this.getformState();
    if (this.dialogData.isEdit == true) {
      this.headerName = "Edit Employee";
      this.row = this.dialogData.row;
      this.setFormData();
    }

  }

  createEmployeeForm() {
    return this.formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      address1: [null, [Validators.required]],
      address2: [null, [Validators.required,]],
    });
  }

  setFormData() {
    this.employeeForm.patchValue({
      firstname: this.row.FirstName,
      lastname: this.row.LastName,
      salary: this.row.Salary,
      address1: this.row.Address1,
      address2: this.row.Address2,
    })
  }

  getformState() {
    this.buttonOptions = this.commonService.disableButton(this.buttonOptions);
    this.employeeForm.valueChanges
      .subscribe(val => {
        if (this.employeeForm.valid) {
          this.buttonOptions = this.commonService.getButtonOptions("Save Employee", "save");
        }
        else {
          this.buttonOptions = this.commonService.disableButton(this.buttonOptions);
        }
      });
  }

  saveEmployee() {
    this.buttonOptions = this.commonService.savingButton(this.buttonOptions);
    var formData = this.employeeForm.value;
    if (this.dialogData.isEdit == true) {
      this.addEmployeeMetaData.EmployeeId = this.row.EmployeeId;
    }
    else {
      this.addEmployeeMetaData.EmployeeId = null;
    }

    this.addEmployeeMetaData.FirstName = formData.firstname;
    this.addEmployeeMetaData.LastName = formData.lastname;
    this.addEmployeeMetaData.Salary = parseFloat(formData.salary);
    this.addEmployeeMetaData.Address1 = formData.address1;
    this.addEmployeeMetaData.Address2 = formData.address2;
    this.addEmployeeMetaData.CreatedDate = null;
    this.addEmployeeMetaData.ModifiedDate = null;

    this.employeeService.addEditEmployee(this.addEmployeeMetaData)
      .subscribe((response: any) => {
        if (this.dialogData.isEdit == true) {
          this.toastr.successToastr("Employee updated successfully", "Success");
        }
        else {
          this.toastr.successToastr("Employee added successfully", "Success");
        }
        this.dialogRef.close(true);
      },
        error => {
          this.buttonOptions = this.commonService.getButtonOptions("Save Employee", "save");
          this.toastr.errorToastr('This is not good!', 'Oops!');
        })
  }

  closePopup() {
    this.dialogRef.close(false);
  }





}
