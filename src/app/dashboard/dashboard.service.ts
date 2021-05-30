import { Injectable } from '@angular/core';
import { ApiService, API_URL } from 'common/service/api-configuration';
import { URLMetadata } from 'common/model/authentication.metadata';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  urlMetadata: URLMetadata;

  constructor(
    private apiService: ApiService,
  ) {
    this.urlMetadata = new URLMetadata();
  }

  getEmployeeList() {
    this.urlMetadata.URL = API_URL.Employee_URL;
    this.urlMetadata.MethodName = "GetEmployeeList";
    this.urlMetadata.Params = null;
    return this.apiService.getAll(this.urlMetadata);
  }

  employeeDashboardChart() {
    this.urlMetadata.URL = API_URL.Employee_URL;
    this.urlMetadata.MethodName = "GetEmployeeDashboardChart";
    this.urlMetadata.Params = null;
    return this.apiService.getAll(this.urlMetadata);
  }





}
