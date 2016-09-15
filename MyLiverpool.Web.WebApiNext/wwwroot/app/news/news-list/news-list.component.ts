﻿import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/news.service';
import { News } from "../shared/news.model";
import { Observable } from 'rxjs/Observable';
import { Pageable } from '../../shared/pageable.model';

@Component({
    selector: 'news-list',
    templateUrl: 'app/news/news-list/news-list.component.html',
    providers: [NewsService]
})

export class NewsListComponent implements OnInit {

    items: News[];

    constructor(private newsService: NewsService) { //todo NEED CONFIGURation
    }

    ngOnInit() {
        this.newsService
                .GetAll()
                .subscribe(data => this.parsePageable(data),
                error => console.log(error),
                () => console.log("success load list news"));
        }

    private parsePageable(pageable: Pageable<News>): void {
        this.items = pageable.list; //todo parse others
    }
}