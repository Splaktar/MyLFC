﻿import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { MatPaginator, MatSort, MatSelect } from '@angular/material';
import { ActivatedRoute } from "@angular/router";
import { User, UserFilters, UserService } from "@app/user";
import { merge, of, Observable, fromEvent } from 'rxjs';
import { startWith, switchMap, map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RoleGroup, RoleGroupService } from "@app/roleGroup";
import { Pageable, RolesCheckedService } from "@app/shared";

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html"
})

export class UserListComponent implements OnInit {
    public items: User[];
    public roleGroups: RoleGroup[];
    public selectedUserId: number;
    displayedColumns = ['lastModified', 'userName', 'commentsCount', 'roleGroupName'];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild("roleSelect") roleSelect: MatSelect;
    @ViewChild("userInput") userInput: ElementRef;

    constructor(private userService: UserService,
        private location: Location,
        private roleGroupService: RoleGroupService,
        public roles: RolesCheckedService,
        private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.paginator.pageIndex = +this.route.snapshot.queryParams["page"] - 1 || 0;
        this.paginator.pageSize = +this.route.snapshot.queryParams["itemsPerPage"] || 15;
        this.userInput.nativeElement.value = this.route.snapshot.queryParams["userName"] || "";
        this.roleSelect.value = this.route.snapshot.queryParams["roleGroupId"] || "";
        this.updateRoleGroups();

        merge(this.sort.sortChange,
                this.roleSelect.selectionChange,
            fromEvent(this.userInput.nativeElement, 'keyup')
                .pipe(debounceTime(1000),
                    distinctUntilChanged()))
            .subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page, this.roleSelect.selectionChange,
                fromEvent(this.userInput.nativeElement, 'keyup')
                .pipe(debounceTime(1000),
                    distinctUntilChanged()))
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.update();
                }),
                map((data: Pageable<User>) => {
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

    public writePm(index: number): void {
        this.selectedUserId = index;
    }

    public closePmWindow(event: any): void {
        this.selectedUserId = null;
    }

    public update(): Observable<Pageable<User>> {
        const filters = new UserFilters();
        filters.page = this.paginator.pageIndex + 1;
        filters.itemsPerPage = this.paginator.pageSize;
        filters.roleGroupId = this.roleSelect.value;
        filters.userName = this.userInput.nativeElement.value;
        filters.sortBy = this.sort.active;
        filters.order = this.sort.direction;

        return this.userService
            .getAll(filters);
    }

    private updateUrl(): void {
        let newUrl = `users?page=${this.paginator.pageIndex + 1}`;

        const userName = this.userInput.nativeElement.value;
        if (userName) {
            newUrl = `${newUrl}&userName=${userName}`;
        }
        const roleGroupId = this.roleSelect.value;
        if (roleGroupId) {
            newUrl = `${newUrl}&roleGroupId=${roleGroupId}`;
        }

        this.location.replaceState(newUrl);
    }

    private updateRoleGroups() {
        this.roleGroupService.getAll().subscribe(data => this.roleGroups = data,
            e => console.log(e));
    }
}