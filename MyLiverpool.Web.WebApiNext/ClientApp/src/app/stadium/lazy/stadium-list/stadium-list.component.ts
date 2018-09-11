﻿import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatPaginator } from "@angular/material";
import { Subscription, merge, of, Observable } from "rxjs";
import { startWith, switchMap, map, catchError } from "rxjs/operators";
import { Stadium } from "../../model";
import { StadiumService } from "../../core";
import { Pageable, DeleteDialogComponent } from "@app/shared";
import { PAGE, STADIUMS_ROUTE } from "@app/+constants";
import { StadiumFilters } from "../../model/stadiumFilters.model";

@Component({
    selector: "stadium-list",
    templateUrl: "./stadium-list.component.html"
})

export class StadiumListComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    private sub2: Subscription;
    public items: Stadium[];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private service: StadiumService,
        private route: ActivatedRoute,
        private location: Location,
        private dialog: MatDialog) {
    }

    public ngOnInit(): void {
        this.sub = this.route.queryParams.subscribe(qParams => {
                this.paginator.pageIndex = +qParams["page"] - 1 || 0;
                this.paginator.pageSize = +qParams["itemsPerPage"] || 15;

            },
            e => console.log(e));


        merge(this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.update();
                }),
                map((data: Pageable<Stadium>) => {
                    this.paginator.pageIndex = data.pageNo - 1;
                    this.paginator.pageSize = data.itemPerPage;
                    this.paginator.length = data.totalItems;

                    return data.list;
                }),
                catchError(() => {
                    return of([]);
                })
            ).subscribe(data => {
                    this.items = data;
                    this.updateUrl();
                },
                e => console.log(e));
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

    public update(): Observable<Pageable<Stadium>> {
        const filters = new StadiumFilters();
        filters.page = this.paginator.pageIndex + 1;
        filters.itemsPerPage = this.paginator.pageSize;

        return this.service
            .getAll(filters);
    }

    public updateUrl(): void {
        let newUrl = `${STADIUMS_ROUTE}?${PAGE}=${this.paginator.pageIndex + 1}`;
        this.location.replaceState(newUrl);
    };

    private delete(index: number): void {
        let result: boolean;
        this.service.delete(this.items[index].id)
            .subscribe(res => result = res,
                e => console.log(e),
                () => {
                    if (result) {
                        this.items.splice(index, 1);
                        this.paginator.length -= 1;
                    }
                });
    }
}