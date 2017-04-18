﻿import { FormControl } from "@angular/forms";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { AccountService } from "./account.service";
import { Configuration } from "../app.constants";

@Injectable()
export class AccountValidators {
    static service: AccountService;
    static changed = new Subject<any>();
    static changed1 = new Subject<any>();

    constructor(private service1: AccountService
        , private configuration: Configuration) {
        AccountValidators.service = service1;
    }

    isEmailUnique(control: FormControl): Observable<IValidationResult> {
        AccountValidators.changed.next();
        return new Observable((obs: any) => {
            control
                .valueChanges
                .debounceTime(this.configuration.debounceTime)                
                .takeUntil(AccountValidators.changed)
                .take(1)
                .switchMap((value: string) => AccountValidators.service.isEmailUnique(value))
                .subscribe(
                data => {
                    if (+control.value.length < this.configuration.minEmailLength || data) {  
                        obs.next(null);
                    } else {
                        obs.next({ "notUniqueEmail": true });
                    }
                    obs.complete();
                },
                error => {
                    console.log(error);
                    obs.complete();
                });
        });
    }

    isUserNameUnique(control: FormControl): Observable<IValidationResult> {
        AccountValidators.changed1.next();
        return new Observable((obs: any) => {
            control
                .valueChanges
                .debounceTime(this.configuration.debounceTime)
                .take(1)
                .switchMap((value: string) => AccountValidators.service.isUserNameUnique(value))
                .subscribe(
                data => {
                    if (+control.value.length < this.configuration.minUserNameLength || data) {
                        obs.next(null);
                    } else {
                        obs.next({ "notUniqueUserName": true });
                    }
                    obs.complete();
                },
                error => {
                    console.log(error);
                    obs.complete();
                });
        });
    }
}

interface IValidationResult {
    [key: string]: boolean;
}