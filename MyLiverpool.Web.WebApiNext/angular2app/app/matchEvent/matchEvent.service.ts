﻿import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { MatchEvent } from "./matchEvent.model";
import { MatchEventType } from "./matchEventType.model";
import { Pageable, HttpWrapper } from "../shared/index";

@Injectable()
export class MatchEventService {
    private actionUrl: string;

    constructor(private http: HttpWrapper) {
        this.actionUrl = "matchEvent/";
    }
/*
    public getAll(page: number): Observable<Pageable<MatchEvent>> {
        return this.http.get<Pageable<MatchEvent>>(this.actionUrl + "list?page=" + page);
    };

    public getSingle(id: number): Observable<MatchEvent> {
        return this.http.get<MatchEvent>(this.actionUrl + id);
    };*/

    public getForMatch(matchId: number): Observable<MatchEvent[]> {
        return this.http.get<MatchEvent[]>(`${this.actionUrl}getForMatch/${matchId}`);
    };

    public create(item: MatchEvent): Observable<MatchEvent> {
        return this.http.post<MatchEvent>(this.actionUrl, JSON.stringify(item));
    };

    public update(id: number, itemToUpdate: MatchEvent): Observable<MatchEvent> {
        return this.http.put<MatchEvent>(this.actionUrl + id, JSON.stringify(itemToUpdate));
    };

    public getTypes(): Observable<MatchEventType[]> {
        return this.http.get<MatchEventType[]>(this.actionUrl + "getTypes/");
    };
    /*
    public delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.actionUrl + id);
    };*/
}