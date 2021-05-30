import { Injectable } from '@angular/core';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { URLMetadata } from '../model/authentication.metadata';
import { ApiService, API_URL } from './api-configuration';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    urlMetadata: URLMetadata;

    constructor(
        private apiService: ApiService,
    ) {
        this.urlMetadata = new URLMetadata();
    }

    getSubscriberList() {
        this.urlMetadata.URL = API_URL.Autentication_URL;
        this.urlMetadata.MethodName = "GetSubscriberUserList";
        this.urlMetadata.Params = null;
        return this.apiService.getAll(this.urlMetadata);
    }

    getCityList() {
        this.urlMetadata.URL = API_URL.Autentication_URL;
        this.urlMetadata.MethodName = "GetCityList";
        this.urlMetadata.Params = null;
        return this.apiService.getAll(this.urlMetadata);
    }

    getStateList() {
        this.urlMetadata.URL = API_URL.Autentication_URL;
        this.urlMetadata.MethodName = "GetStateList";
        this.urlMetadata.Params = null;
        return this.apiService.getAll(this.urlMetadata);
    }

    getCountryList() {
        this.urlMetadata.URL = API_URL.Autentication_URL;
        this.urlMetadata.MethodName = "GetCountryList";
        this.urlMetadata.Params = null;
        return this.apiService.getAll(this.urlMetadata);
    }

    getISDCodeList() {
        var ISDCodeList = [];
        ISDCodeList.push({ Value: 91, Text: "+91" });
        ISDCodeList.push({ Value: 93, Text: "+93" });
        ISDCodeList.push({ Value: 595, Text: "+595" });
        ISDCodeList.push({ Value: 596, Text: "+596" });
        ISDCodeList.push({ Value: 597, Text: "+597" });
        return ISDCodeList;
    }

    onlyNumberValidation(event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    getDatatableLimit() {
        var limit = [];
        limit.push({ key: "10" });
        limit.push({ key: "20" });
        limit.push({ key: "50" });
        limit.push({ key: "100" });
        return limit;
    }

    logout(token) {
        this.urlMetadata.URL = API_URL.Autentication_URL;
        this.urlMetadata.MethodName = "Logout(token=" + token + ")";
        this.urlMetadata.Params = null;
        return this.apiService.getAll(this.urlMetadata);
    }

    getButtonOptions(name, icon) {
        var buttonOptions: MatProgressButtonOptions = {
            active: false,
            text: name,
            spinnerSize: 18,
            raised: true,
            stroked: false,
            //buttonColor: "primary",
            //spinnerColor: "accent",
            fullWidth: false,
            disabled: false,
            mode: "indeterminate",
            customClass: 'main-color',
            buttonIcon: {
                //fontIcon: "favorite"
                fontIcon: icon
            }
        };
        return buttonOptions;
    }

    disableButton(buttonOptions: MatProgressButtonOptions) {
        buttonOptions.disabled = true;
        buttonOptions.customClass = "disable-button";
        return buttonOptions;
    }

    savingButton(buttonOptions: MatProgressButtonOptions) {
        buttonOptions.active = true;
        buttonOptions.text = "Please Wait...";
        buttonOptions.customClass = "disable-button";
        return buttonOptions;
    }



}
