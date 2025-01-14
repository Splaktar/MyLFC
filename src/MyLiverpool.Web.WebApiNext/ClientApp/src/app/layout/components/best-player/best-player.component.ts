﻿import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs';

import { Person } from '@domain/models';

import { LayoutService } from '@layout/layout.service';

@Component({
    selector: 'best-player',
    templateUrl: './best-player.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BestPlayerComponent implements OnInit, OnDestroy {
    public item: Person;
    private sub: Subscription;

    constructor(private service: LayoutService,
                private cd: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        // todo wait until implement on backend
        // this.sub = this.service.getBestPlayer()
        //    .subscribe(data => this.item = data,
        // () => { },
        // () => this.cd.markForCheck());
    }

    public ngOnDestroy(): void {
        if (this.sub) {this.sub.unsubscribe(); }
    }
}
