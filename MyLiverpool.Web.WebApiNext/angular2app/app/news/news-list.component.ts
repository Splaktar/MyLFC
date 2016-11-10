﻿import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Location  } from "@angular/common";
import { NewsService } from "./news.service";
import { News } from "./news.model";
import { Observable } from "rxjs/Observable";
import { Pageable } from "../shared/pageable.model";
import { MaterialFilters } from "./newsFilters.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { RolesCheckedService, IRoles } from "../shared/index";
import { ModalDirective } from "ng2-bootstrap/ng2-bootstrap";

@Component({
    selector: "news-list",
    template: require("./news-list.component.html"),
    changeDetection: ChangeDetectionStrategy.Default
})
export class NewsListComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    items: News[];
    page: number = 1;
    itemsPerPage = 15;
    totalItems: number;
    categoryId: number;
    userName: string;
    roles: IRoles;
    selectedItemIndex: number = undefined;

    @ViewChild("activateModal") activateModal: ModalDirective;
    @ViewChild("deleteModal") deleteModal: ModalDirective;

    constructor(private newsService: NewsService, private route: ActivatedRoute, private location: Location,
        private rolesChecked: RolesCheckedService, private cd: ChangeDetectorRef) {
    }

    showActivateModal(index: number): void {
        this.selectedItemIndex = index;
        this.activateModal.show();
    }

    showDeleteModal(index: number): void {
        this.selectedItemIndex = index;
        this.deleteModal.show();
    }

    hideModal(): void {
        this.selectedItemIndex = undefined;
        this.activateModal.hide();
        this.deleteModal.hide();
    }

    activate(): void {
        let result;

        let news = this.items[this.selectedItemIndex];
        this.newsService.activate(news.id)
            .subscribe(res => result = res,
                e => console.log(e),
                () => {
                    if (result) {
                        news.pending = false;
                        this.hideModal();
                    }
                }
            );
    }

    delete(): void {
        let result;
        this.newsService.delete(this.items[this.selectedItemIndex].id)
            .subscribe(res => result = res,
                e => console.log(e),
                () => {
                    if (result) {
                        this.items.splice(this.selectedItemIndex, 1);
                        this.hideModal();
                    }
                }
            );
    }

    ngOnInit(): void {
        this.roles = this.rolesChecked.checkedRoles;

        this.sub = this.route.params.subscribe(params => {
            if (params["page"]) {
                this.page = +params["page"];
            }
            this.categoryId = +params["categoryId"];
            this.userName = params["userName"];
            this.update();
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    pageChanged(event: any): void {
        this.page = event.page;
        this.update();
        let newUrl = `news/list/${this.page}`;
        if (this.categoryId) {
            newUrl = `${newUrl}/${this.categoryId}`;
        }
        this.location.replaceState(newUrl);
    };

    private parsePageable(pageable: Pageable<News>): void {
        this.items = pageable.list;
        this.page = pageable.pageNo;
        this.itemsPerPage = pageable.itemPerPage;
        this.totalItems = pageable.totalItems;
    }

    private update(): void {
        let filters = new MaterialFilters();
        filters.categoryId = this.categoryId;
        filters.materialType = "News";
        filters.userName = this.userName;
        filters.page = this.page;

        this.newsService
            .getAll(filters)
            .subscribe(data => this.parsePageable(data),
                error => console.log(error),
                () => {});
      //  this.cd.markForCheck();
    }
}