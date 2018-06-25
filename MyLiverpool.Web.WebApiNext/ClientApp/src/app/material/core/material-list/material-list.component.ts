﻿import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { MaterialService } from "../material.service";
import { MaterialActivateDialogComponent } from "../material-activate-dialog";
import { Material, MaterialFilters } from "../../model";
import { RolesCheckedService, DeleteDialogComponent,Pageable } from "@app/shared";
import { MaterialType } from "@app/materialCategory";

@Component({
    selector: "material-list",
    templateUrl: "./material-list.component.html",
    styleUrls: ["./material-list.component.scss"],
})
export class MaterialListComponent implements OnInit, OnDestroy {
    private type: MaterialType;
    private sub: Subscription;
    private sub2: Subscription;
    private userName: string;
    private userId: number = null;
    public items: Material[];
    public page: number = 1;
    public itemsPerPage: number = 15;
    public totalItems: number;
    public categoryId: number;

    constructor(private router: Router,
        private materialService: MaterialService,
        private route: ActivatedRoute,
        private location: Location,
        public roles: RolesCheckedService,
        private snackBar: MatSnackBar,
        private titleService: Title,
        private dialog: MatDialog) {
    }

    public showActivateModal(index: number): void {
        const dialogRef = this.dialog.open(MaterialActivateDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.activate(index);
            }
        }, e => console.log(e));
    }

    public showDeleteModal(index: number): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(index);
            }
        }, e => console.log(e));
    }

    public ngOnInit(): void {
        if (this.router.url.startsWith("/news")) {
            this.titleService.setTitle("Новости");
            this.type = MaterialType.News;
        } else if (this.router.url.startsWith("/blogs")){
            this.titleService.setTitle("Блоги");
            this.type = MaterialType.Blogs;
        } else {
            this.type = MaterialType.Both;
        }
        this.parseQueryParamsAndUpdate(this.route);
    }

    public ngOnDestroy(): void {
        if(this.sub) this.sub.unsubscribe();
        if(this.sub2) this.sub2.unsubscribe();
    }

    public pageChanged(event: any): void {
        this.page = event;
        this.update();
        this.updateUrl();
    };

    private updateUrl(): void {
        let newUrl: string = `${MaterialType[this.type].toLowerCase()}?page=${this.page}`;
        if (this.categoryId) {
            newUrl = `${newUrl}&categoryId=${this.categoryId}`;
        }
        if (this.userName) {
            newUrl = `${newUrl}&userName=${this.userName}`;
        }

        this.location.replaceState(newUrl);
    }

    private activate(index: number): void {
        let result: boolean;

        const news: Material = this.items[index];
        this.materialService.activate(news.id)
            .subscribe(res => result = res,
                e => console.log(e),
                () => {
                    if (result) {
                        news.pending = false;
                        this.snackBar.open("Материал успешно активирован", null, { duration: 5000 });
                    } else {
                        this.snackBar.open("Материал НЕ БЫЛ активирован", null, { duration: 5000 });
                    }
                }
            );
    }

    private delete(index: number): void {
        let result: boolean;
        this.materialService.delete(this.items[index].id)
            .subscribe(res => result = res,
                e => console.log(e),
                () => {
                    if (result) {
                        this.items.splice(index, 1);
                    } else {
                        this.snackBar.open("Ошибка удаления", null, {duration: 5000});
                    }
                }
            );
    }

    private parsePageable(pageable: Pageable<Material>): void {
        this.items = pageable.list;
        this.page = pageable.pageNo;
        this.itemsPerPage = pageable.itemPerPage;
        this.totalItems = pageable.totalItems;
    }

    private update(): void {
        const filters: MaterialFilters = new MaterialFilters();
        filters.categoryId = this.categoryId || null;
        filters.materialType = MaterialType[this.type];
        filters.userName = this.userName || null;
        filters.userId = this.userId || null;
        filters.page = this.page;

        this.sub = this.materialService
            .getAll(filters)
            .subscribe(data => this.parsePageable(data),
                error => console.log(error));
    }

    private parseQueryParamsAndUpdate(route: ActivatedRoute): void {
        this.sub2 = route.queryParams.subscribe(qParams => {
                this.page = qParams["page"] || 1;
                this.categoryId = qParams["categoryId"] || null;
                this.userName = qParams["userName"] || "";
                this.userId = qParams["userId"] || null;
            },
            error => console.log(error));
        this.update();
    }
}