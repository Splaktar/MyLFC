﻿import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { Injury } from '@domain/models';
import { RolesCheckedService } from '@base/auth';

import { LayoutService } from '@layout/layout.service';

const INJURY_CURRENT_KEY = makeStateKey<Injury[]>('injury-current');

@Component({
    selector: 'injury-current-list',
    templateUrl: './injury-current-list.component.html',
    styleUrls: ['./injury-current-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InjuryCurrentListComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    public items: Injury[];

    constructor(private service: LayoutService,
                private transferState: TransferState,
                public roles: RolesCheckedService,
                private cd: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        const savedData = this.transferState.get(INJURY_CURRENT_KEY, null);
        if (savedData) {
            this.items = savedData;
            this.cd.markForCheck();
        } else {
            this.sub = this.service.getCurrentInjuries().subscribe(data => {
                    this.items = data;
                    this.transferState.set(INJURY_CURRENT_KEY, data);
                },
                null,
                () => {
                    this.cd.markForCheck();
                });
        }
    }

    public ngOnDestroy(): void {
        if (this.sub) { this.sub.unsubscribe(); }
    }
}
