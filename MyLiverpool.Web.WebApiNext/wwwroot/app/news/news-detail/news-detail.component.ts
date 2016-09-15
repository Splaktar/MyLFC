﻿import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../shared/news.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { News } from "../shared/news.model";

@Component({
    selector: 'news-detail',
    templateUrl: 'app/news/news-detail/news-detail.component.html',
    providers: [NewsService]
})

export class NewsDetailComponent implements OnInit, OnDestroy {
    
    private sub: Subscription;
    item: News;

    constructor(private newsService: NewsService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.newsService.GetSingle(id)
                .subscribe(data => this.parse(data),
                error => console.log(error),
                () => console.log("success load edit news"));
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private parse(item: News): void {
        this.item = item;
    }
}