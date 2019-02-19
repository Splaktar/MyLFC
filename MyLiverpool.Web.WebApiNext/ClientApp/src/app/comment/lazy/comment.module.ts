﻿import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatCheckboxModule } from "@angular/material";
import { SharedModule } from "@app/shared";
import { commentRoutes } from "./comment.routes";
import { CommentListComponent } from "./comment-list";
import { EditorModule } from "@app/editor";
import { CommentSharedModule } from "../shared";
import { BreadcrumbService } from "@app/shared/breadcrumb";
import { COMMENTS_ROUTE, COMMENTS_RU } from "@app/+constants";

@NgModule({
    imports: [
        SharedModule,
        EditorModule,
        RouterModule.forChild(commentRoutes),
        CommentSharedModule,
        MatCheckboxModule
    ],
    declarations: [
        CommentListComponent,
    ]
})
export class CommentModule {
    constructor(
        private breadcrumbService: BreadcrumbService
    ) {
        this.breadcrumbService.addFriendlyNameForRouteRegex(`/${COMMENTS_ROUTE}`, COMMENTS_RU);
    }}