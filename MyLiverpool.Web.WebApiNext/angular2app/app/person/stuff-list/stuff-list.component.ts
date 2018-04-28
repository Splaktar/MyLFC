﻿import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Person } from "../person.model";
import { PersonService } from "../person.service";
import { PersonTypeEnum } from "../personType.enum";
import { RolesCheckedService } from "@app/shared";

@Component({
    selector: "<stuff-list>",
    templateUrl: "./stuff-list.component.html"
})
export class StuffListComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    public items: Person[];
    public routeLinks: any[];
    public activeLinkIndex: number = 0;

    constructor(private personService: PersonService,
        private route: ActivatedRoute,
        public roles: RolesCheckedService){
    }

    public ngOnInit(): void {
        this.routeLinks = [
            { label: "Первая команда", link: "/stuff/first" },
            { label: "Академия", link: "/stuff/academy" }];
        if (this.route.snapshot.data["type"] === PersonTypeEnum[PersonTypeEnum.First]) {
            this.activeLinkIndex = 0;
        } else {
            this.activeLinkIndex = 1;
        }
        this.updateState(PersonTypeEnum[this.activeLinkIndex].toString());

    }

    public ngOnDestroy(): void {
        if(this.sub) { this.sub.unsubscribe(); }
    }

    public updateState(type: string): void {
        this.sub = this.personService.getStuff(type).subscribe(data => this.items = data,
            e => console.log(e));
    }
}