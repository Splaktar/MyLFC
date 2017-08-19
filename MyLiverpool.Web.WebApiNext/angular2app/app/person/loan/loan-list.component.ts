﻿import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MdDialog } from '@angular/material';
import { Subscription } from "rxjs/Subscription";
import { Loan } from "./loan.model";
import { LoanService } from "./loan.service";
import { Pageable, DeleteDialogComponent } from "../../shared/index";

@Component({
    selector: "loan-list",
    templateUrl: "./loan-list.component.html"
})

export class LoanListComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    private sub2: Subscription;
    public items: Loan[];
    public page: number = 1;
    public itemsPerPage: number = 15;
    public totalItems: number;

    constructor(private injuryService: LoanService,
        private route: ActivatedRoute,
        private location: Location,
        private dialog: MdDialog) {
    }

    public ngOnInit(): void {
        this.sub = this.route.queryParams.subscribe(qParams => {
                this.page = qParams["page"] || 1;
            },
            error => console.log(error));
        this.update();
    }

    public ngOnDestroy(): void {
        if (this.sub) this.sub.unsubscribe();
        if (this.sub2) this.sub2.unsubscribe();
    }

    public showDeleteModal(index: number): void {
        let dialogRef = this.dialog.open(DeleteDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(index);
            }
        }, e => console.log(e));
    }

    public update(): void {
        this.sub2 = this.injuryService
            .getAll(this.page)
            .subscribe(data => this.parsePageable(data),
                error => console.log(error));
    }

    public pageChanged(event: any): void {
        this.page = event;
        this.update();
        let newUrl = `loans?page=${this.page}`;
        this.location.replaceState(newUrl);
    };
    
    private delete(index: number): void {
        let result: boolean;
        this.injuryService.delete(this.items[index].id)
            .subscribe(res => result = res,
                e => console.log(e),
                () => {
                    if (result) {
                        this.items.splice(index, 1);
                        this.totalItems -= 1;
                    }
                });
    }

    private parsePageable(pageable: Pageable<Loan>): void {
        this.items = pageable.list;
        this.page = pageable.pageNo;
        this.itemsPerPage = pageable.itemPerPage;
        this.totalItems = pageable.totalItems;
    }
}