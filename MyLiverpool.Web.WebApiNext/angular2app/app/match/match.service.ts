﻿import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Match } from "./match.model";
import { MatchType } from "./matchType.model";
import { Pageable } from "../shared/pageable.model";
import { HttpWrapper } from "../shared/httpWrapper";

@Injectable()
export class MatchService {
    private actionUrl: string;

    constructor(private http: HttpWrapper) {
        this.actionUrl = "match/";
    }

    public getAll = (page: number): Observable<Pageable<Match>> => {
        return this.http.get<Pageable<Match>>(this.actionUrl + "list?page=" + page);
    };

    public getForCalendar = (): Observable<Match[]> => {
        return this.http.get<Match[]>(this.actionUrl + "getForCalendar");
    };

    public getSingle = (id: number): Observable<Match> => {
        return this.http.get<Match> (this.actionUrl + id);
    };

    public create = (item: Match): Observable<Match> => {
        return this.http.post<Match>(this.actionUrl, JSON.stringify(item));
    };

    public update = (id: number, itemToUpdate: Match): Observable<Match> => {
        return this.http.put<Match>(this.actionUrl + id, JSON.stringify(itemToUpdate));
    };

    public updateScore = (id: number, score: string): Observable<Match> => {
        return this.http.put<Match>(`${this.actionUrl}updateScore?id=${id}&score=${score}`, null);
    };

    public getTypes = (): Observable<MatchType[]> => {
        return this.http.get<MatchType[]>(this.actionUrl + "getTypes/");
    };

    public delete = (id: number): Observable<boolean> => {
        return this.http.delete<boolean>(this.actionUrl + id);
    };
}