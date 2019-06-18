﻿import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "@app/+constants";

@Injectable()
export class HttpWrapper {
    constructor(
        @Inject("BASE_URL") private baseUrl: string,
        private http: HttpClient
    ) {
    }

    public get<T>(url: string): Observable<T> {
        return this.http.get<T>(this.baseUrl + API_URL + url, {
            headers: this.updateHeaders()
        });
    }  

    public getWithParams<T>(url: string, params: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        return this.http.get<T>(this.baseUrl + API_URL + url, {
            headers: this.updateHeaders(),
            params: this.buildUrlSearchParams(params)
        });
    }  

    public getString(url: string): Observable<string> {
        return this.http.get(this.baseUrl + API_URL + url, {
            headers: this.updateHeaders(),
            responseType: "text"
        });
    }  
    
    public post<T>(url: string, data: any, withFiles: boolean = false): Observable<T> {
        return this.http.post<T>(this.baseUrl + API_URL + url, data, {
            headers: this.updateHeaders(withFiles)
        });
    }

    public put<T>(url: string, data: any): Observable<T> {
        return this.http.put<T>(this.baseUrl + API_URL + url, data, {
            headers: this.updateHeaders()
        });
    }

    public delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(this.baseUrl + API_URL + url, {
            headers: this.updateHeaders()
        });
    }

    private updateHeaders(withFiles: boolean = false): HttpHeaders {
        return new HttpHeaders().set(withFiles ? "Accept" : "Content-type", "application/json");
    }

    private buildUrlSearchParams(params: any): HttpParams {
        let searchParams = new HttpParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                searchParams = searchParams.append(key, params[key] || "");
            }
        }
        return searchParams;
    }
}