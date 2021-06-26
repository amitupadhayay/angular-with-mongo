import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { URLMetadata } from '../model/authentication.metadata';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'response-Type': 'json',
        })
    }

    constructor(
        private http: HttpClient,
    ) { }

    getAll(urlMetadata: URLMetadata): Observable<any[]> {
        return this.http.get<any[]>(urlMetadata.URL + urlMetadata.MethodName);
    }

    // getAll(urlMetadata: URLMetadata): Observable<any[]> {
    //     return this.http.get<any[]>(urlMetadata.URL + urlMetadata.MethodName)
    //         .pipe(
    //             tap(_ => console.log('fetched heroes')),
    //             catchError(this.handleError<any[]>('getHeroes', []))
    //         );
    // }



    get(urlMetadata: URLMetadata): Observable<any> {
        return this.http.get<any>(urlMetadata.URL + urlMetadata.MethodName, this.httpOptions);
    }

    post(urlMetadata: URLMetadata): Observable<any> {
        return this.http.post<any>(urlMetadata.URL + urlMetadata.MethodName,
            urlMetadata.Params, this.httpOptions);
    }

    delete(urlMetadata: URLMetadata): Observable<any> {
        return this.http.delete<any>(urlMetadata.URL + urlMetadata.MethodName);
    }

    upload(urlMetadata: URLMetadata, formData: FormData): Observable<any> {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const httpOptions = { headers: headers };
        return this.http.post(urlMetadata.URL + urlMetadata.MethodName, formData, httpOptions)
    }

    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }


}



export enum API_URL {

    // Autentication_URL = 'http://localhost:50771/api/Authentication/',
    // CompanyContact_URL = 'http://localhost:50771/api/CompanyContact/',
    //Common_URL = 'http://localhost:50771/api/Common/',
    //Employee_URL = 'https://localhost:44361/api/Employee/',

    // Autentication_URL = 'http://100.76.51.63:5555/api/Authentication/',
    // CompanyContact_URL = 'http://100.76.51.63:5555/api/CompanyContact/',
    // Common_URL = 'http://100.76.51.63:5555/api/Common/',
    //Employee_URL = 'http://mongo-api.net/api/Employee/',

    //WEB API
    // Employee_URL = 'https://localhost:44375/api/Employee/',
    // Autentication_URL = 'https://localhost:44375/api/Auth/',


    //WEB API
    Employee_URL = 'https://localhost:44346/Employee/', 
    Common_URL = 'http://localhost:44346/api/Common/',
    Autentication_URL = 'https://localhost:44346/api/Auth/',

     //.NET CORE MongoDB API
    // Autentication_URL = 'https://localhost:44319/api/Auth/',
    // Employee_URL = 'https://localhost:44319/api/Employee/', 
    // Common_URL = 'http://localhost:44319/api/Common/',
    


}