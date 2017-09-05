﻿import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpWrapper } from "../shared/httpWrapper";
import { Season } from "./season.model";

@Injectable()
export class SeasonService {
    private actionUrl: string = "season/";

    constructor(private http: HttpWrapper) {
    }

    public getAll = (): Observable<Season[]> => {
        return this.http.get<Season[]>(`${this.actionUrl}list/`);
    };

    public getSingle = (id: number): Observable<Season> => {
        return this.http.get<Season>(`${this.actionUrl}/${id}`);
    };

    public create = (item: Season): Observable<Season> => {
        return this.http.post<Season>(this.actionUrl, JSON.stringify(item));
    };

    public update = (id: number, itemToUpdate: Season): Observable<Season> => {
        return this.http.put<Season>(this.actionUrl + id, JSON.stringify(itemToUpdate));
    };

    public delete = (id: number): Observable<boolean> => {
        return this.http.delete<boolean>(this.actionUrl + id);
    };

    public getSingleWithMatches = (seasonId: number): Observable<Season> => {
        return this.http.get<Season>(`${this.actionUrl}getWithMatches/${seasonId}`);
    }
}