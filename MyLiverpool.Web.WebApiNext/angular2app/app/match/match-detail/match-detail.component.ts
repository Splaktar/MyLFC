﻿import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription } from "rxjs/Subscription";
import { Title } from "@angular/platform-browser";
import { interval } from "rxjs/observable/interval";
import { map } from "rxjs/operators";
import { MatchService } from "../match.service";
import { Match } from "../match.model";
import { RolesCheckedService } from "@app/shared";

@Component({
    selector: "match-detail",
    templateUrl: "./match-detail.component.html"
})
export class MatchDetailComponent implements OnInit, OnDestroy {
    private sub$: Subscription;
    public item: Match;
    public countDown$: BehaviorSubject<string>;

    constructor(private matchService: MatchService,
        public roles: RolesCheckedService,
        private title: Title,
        private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        const id = this.route.snapshot.params["id"];
        if (id) {
            this.matchService.getSingle(id)
                .subscribe(data => {
                    this.item = data;
                    this.title.setTitle(`${this.item.homeClubName} ${this.item.scoreHome}-${this.item.scoreAway} ${this.item.awayClubName}`);
                        if (!data.scoreHome) {
                            this.countDown$ =
                                new BehaviorSubject<string>(this.updateTimeRemaining(this.item.dateTime));
                            this.sub$ = interval(1000).pipe(
                                    map(() => this.countDown$.next(this.updateTimeRemaining(this.item.dateTime)))
                                )
                                .subscribe();

                        }
                    },
                    e => console.log(e));
        };
    }

    public ngOnDestroy(): void {
        if (this.sub$) this.sub$.unsubscribe();
    }

    public pin(id?: number): void {
        this.matchService.pin(id).subscribe(data => data, e => console.log(e));
    }

    private updateTimeRemaining(endtime: Date): string {
        const t = Date.parse(endtime.toString()) - Date.parse(new Date().toString());
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        if (t < 0 && this.sub$) {
            this.sub$.unsubscribe();
            return "Матч начался!";
        }
        return `${days}д:${hours}ч:${minutes}м:${seconds}с`;
    }
}