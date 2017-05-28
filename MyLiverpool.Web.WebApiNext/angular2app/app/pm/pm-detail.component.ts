﻿import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Subscription } from "rxjs/Subscription";
import { Pm } from "./pm.model";
import { PmService } from "./pm.service";
import { RolesCheckedService, IRoles } from "../shared/index";

@Component({
    selector: "pm-detail",
    templateUrl: "./pm-detail.component.html"
})

export class PmDetailComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    private sub2: Subscription;
    public item: Pm;
    public roles: IRoles;
    public selectedUserId: number;
    public selectedUserName: string;

    constructor(private pmService: PmService,
        private rolesChecked: RolesCheckedService,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.roles = this.rolesChecked.checkRoles();
        this.sub = this.route.params.subscribe(params => {
            let id = +params["id"];
            this.sub2 = this.pmService.getSingle(id)
                .subscribe(data => this.parse(data),
                error => console.log(error));
        });
    }

    public ngOnDestroy(): void {
        if(this.sub) { this.sub.unsubscribe(); }
        if(this.sub2) { this.sub2.unsubscribe(); }
    }

    public writePm(): void {
        if (this.roles.isSelf(this.item.senderId)) {
            this.selectedUserId = this.item.receiverId;
            this.selectedUserName = this.item.receiver;
        } else {
            this.selectedUserId = this.item.senderId;
            this.selectedUserName = this.item.sender;
        }
    }

    public closePmWindow(event: any): void {
        this.selectedUserId = null;
    }

    public sanitizeByHtml(text: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(text);
    }

    private parse(item: Pm): void {
        this.item = item;
    }
}