﻿import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PmService } from "../pm.service";
import { SignalRService } from "@app/+signalr";
import { CustomTitleService } from "@app/shared";
@Component({
    selector: "pm-counter",
    templateUrl: "./pm-counter.component.html",
    changeDetection: ChangeDetectionStrategy.Default
})
export class PmCounterComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    public count: number = 0;
    private action: string = "Перейти";

    constructor(private pmService: PmService,
        private snackBar: MatSnackBar,
        private signalR: SignalRService,
        private cd: ChangeDetectorRef,
        private titleService: CustomTitleService,
        private router: Router) {
    }

    public ngOnInit(): void {
        this.updateCount();

        this.signalR.readPm.subscribe(data => {
            this.count--;
                this.titleService.removeCount(1);
            },
            () => this.cd.markForCheck());
        this.signalR.newPm.subscribe(data => {
            this.count++;
                this.titleService.addCount(1);
                this.snackBar.open("Вам прислали сообщение", this.action)
                    .onAction()
                    .subscribe(_ => this.router.navigate(["/pms", data.id]));
            },
            () => this.cd.markForCheck());
    }

    public ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    private updateCount() {
        this.sub = this.pmService.getUnreadCount()
            .subscribe(data => {
                    this.count = +data;
                if (+data > 0) {
                    this.titleService.addCount(this.count);
                        this.snackBar
                            .open("У вас есть непрочитанные личные сообщения", this.action)
                            .onAction()
                            .subscribe(data => this.router.navigate(["/pms"]));
                    }
                },
                e => console.log(e),
                () => this.cd.markForCheck());
    }
}