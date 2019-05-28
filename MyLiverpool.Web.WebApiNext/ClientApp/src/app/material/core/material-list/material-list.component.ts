import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Location } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { MaterialService } from "../material.service";
import { MaterialActivateDialogComponent } from "../material-activate-dialog";
import { Material, MaterialFilters } from "../../model";
import { DeleteDialogComponent, PagedList } from "@app/shared";
import { RolesCheckedService } from "@app/+auth";
import { MaterialType } from "@app/materialCategory";
import { CustomTitleMetaService as CustomTitleService } from "@app/shared";
import { PAGE, TITLE_RU, NEWSS_RU, BLOGS_RU } from "@app/+constants";

@Component({
    selector: "material-list",
    templateUrl: "./material-list.component.html",
    styleUrls: ["./material-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialListComponent implements OnInit, OnDestroy {
    private type: MaterialType = MaterialType.Both;
    private sub: Subscription;
    private sub2: Subscription;
    private navigationSubscription: Subscription;
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
        private cd: ChangeDetectorRef,
        public roles: RolesCheckedService,
        
        private snackBar: MatSnackBar,
        private titleService: CustomTitleService,
        private dialog: MatDialog) {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                this.parseQueryParamsAndUpdate();
            }
        });
    }

    public showActivateModal(index: number): void {
        const dialogRef = this.dialog.open(MaterialActivateDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.activate(index);
            }
        });
    }

    public showDeleteModal(index: number): void {
        const dialogRef = this.dialog.open(DeleteDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(index);
            }
        });
    }

    public ngOnInit(): void {
        if (this.router.url.startsWith("/news")) {
            this.titleService.setTitle(NEWSS_RU);
            this.type = MaterialType.News;
        } else if (this.router.url.startsWith("/blogs")){
            this.titleService.setTitle(BLOGS_RU);
            this.type = MaterialType.Blogs;
        } else {
            this.type = MaterialType.Both;
            this.titleService.setTitle(TITLE_RU);
        }
    }

    public ngOnDestroy(): void {
        if(this.sub) this.sub.unsubscribe();
        if(this.sub2) this.sub2.unsubscribe();
        if(this.navigationSubscription) this.navigationSubscription.unsubscribe();
    }

    public pageChanged(event: any): void {
        this.page = event;
        this.update();
        this.updateUrl();
    };

    private updateUrl(): void {
        let newUrl: string = `${MaterialType[this.type].toLowerCase()}?${PAGE}=${this.page}`;
        if (this.categoryId) {
            newUrl = `${newUrl}&categoryId=${this.categoryId}`;
        }

        this.location.replaceState(newUrl);
    }

    private activate(index: number): void {
        const news: Material = this.items[index];
        this.materialService.activate(news.id)
            .subscribe(res => {
                    if (res) {
                        news.pending = false;
                        this.snackBar.open("Материал активирован");
                    } else {
                        this.snackBar.open("Материал НЕ активирован");
                    }
                },
                () => {},
                () => this.cd.markForCheck());
    }

    private delete(index: number): void {
        this.materialService.delete(this.items[index].id)
            .subscribe(res => {
                if (res) {
                    this.items.splice(index, 1);
                } else {
                    this.snackBar.open("Ошибка удаления");
                }
            },
            () => { },
            () => this.cd.markForCheck());
    }

    private parsePageable(pageable: PagedList<Material>): void {
        this.items = pageable.results;
        this.page = pageable.currentPage;
        this.itemsPerPage = pageable.pageSize;
        this.totalItems = pageable.rowCount;
    }

    private update(): void {
        const filters: MaterialFilters = new MaterialFilters();
        filters.categoryId = this.categoryId || null;
        filters.materialType = MaterialType[this.type];
        filters.userId = this.userId || null;
        filters.currentPage = this.page;
        this.sub = this.materialService
            .getAll(filters)
            .subscribe(data => this.parsePageable(data),
                () => {},
                () => this.cd.markForCheck());
    }

    private parseQueryParamsAndUpdate(): void {
        this.sub2 = this.route.queryParams.subscribe(qParams => {
                this.page = qParams[PAGE] || 1;
                this.categoryId = qParams["categoryId"] || null;
                this.userId = qParams["userId"] || null;
            });
        this.update();
    }
}