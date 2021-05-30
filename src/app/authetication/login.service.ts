import { Injectable } from '@angular/core';
import { ApiService, API_URL } from 'common/service/api-configuration';
import { URLMetadata } from 'common/model/authentication.metadata';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    urlMetadata: URLMetadata;

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
    ) {
        this.urlMetadata = new URLMetadata();
    }

    login(userName, password) {
        this.urlMetadata.URL = API_URL.Autentication_URL;
        this.urlMetadata.MethodName = "CheckAuthentication(userName=" + userName + ",password=" + password + ")";
        this.urlMetadata.Params = null;
        return this.apiService.get(this.urlMetadata);
    }


}