import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Subscription, merge, of, Observable } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

import { Stadium, StadiumFilters, PagedList } from '@domain/models';
import { StadiumService } from '@stadiums/core';
import { DeleteDialogComponent } from '@shared/index';
import { PAGE, STADIUMS_ROUTE } from '@constants/index';

@Component({
    selector: 'stadium-list',
    templateUrl: './stadium-list.component.html'
})
export class StadiumListComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    private sub2: Subscription;
    public items: Stadium[];
    displayedColumns = ['name', 'city'];


    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    constructor(private service: StadiumService,
                private route: ActivatedRoute,
                private location: Location,
                private dialog: MatDialog) {
    }

    public ngOnInit(): void {
        this.sub = this.route.queryParams.subscribe(qParams => {
                this.paginator.pageIndex = +qParams[PAGE] - 1 || 0;
                this.paginator.pageSize = +qParams.itemsPerPage || 15;

            });

        merge(this.sort.sortChange
           //     ,
          //      fromEvent(this.nameInput.nativeElement, KEYUP)
          //      .pipe(debounceTime(DEBOUNCE_TIME),
           //         distinctUntilChanged())
                    )
            .subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.update();
                }),
                map((data: PagedList<Stadium>) => {
                    this.paginator.pageIndex = data.currentPage - 1;
                    this.paginator.pageSize = data.pageSize;
                    this.paginator.length = data.rowCount;

                    return data.results;
                }),
                catchError(() => {
                    return of([]);
                })
        ).subscribe((data: Stadium[]) => {
                    this.items = data;
                    this.updateUrl();
                });
    }

    public ngOnDestroy(): void {
        if (this.sub) { this.sub.unsubscribe(); }
        if (this.sub2) { this.sub2.unsubscribe(); }
    }

    public showDeleteModal(index: number): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.delete(index);
                }
            });
    }

    public update(): Observable<PagedList<Stadium>> {
        const filters = new StadiumFilters();
        filters.currentPage = this.paginator.pageIndex + 1;
        filters.pageSize = this.paginator.pageSize;
        filters.sortOn = this.sort.active;
        filters.sortDirection = this.sort.direction;

        return this.service
            .getAll(filters);
    }

    public updateUrl(): void {
        const newUrl = `${STADIUMS_ROUTE}?${PAGE}=${this.paginator.pageIndex + 1}`;
        this.location.replaceState(newUrl);
    }

    private delete(index: number): void {
        this.service.delete(this.items[index].id)
            .subscribe((res: boolean) => {
                if (res) {
                    this.items.splice(index, 1);
                    this.paginator.length -= 1;
                }
            });
    }
}
