import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

import { Season } from '@domain/models';
import { SeasonService } from '../../core';
import { RolesCheckedService } from '@app/+auth';
import { PagedList } from '@app/shared';

@Component({
    selector: 'season-calendar',
    templateUrl: './season-calendar.component.html',
    styleUrls: ['./season-calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonCalendarComponent implements OnInit {
    public selected: Season;
    private id = 0;
    public seasons: Season[];

    @ViewChild('seasonSelect', { static: true })seasonSelect: MatSelect;

    constructor(private service: SeasonService,
        public roles: RolesCheckedService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        if (+this.route.snapshot.params['id']) {
            this.id = +this.route.snapshot.params['id'];
        }

        this.seasonSelect.selectionChange.subscribe((data: MatSelectChange) => {
            this.id = data.value;
            this.update(false);
        });

        this.service.getAllWithoutFilter()
            .subscribe((data: PagedList<Season>) => this.seasons = data.results);

        this.update(true);
    }

    private update(selectUpdate: boolean): void {
        this.service.getSingleCalendarWithMatches(this.id)
            .subscribe((data: Season) => {
                    this.selected = data;
                    if (selectUpdate) {
                        this.seasonSelect.value = data.id;
                    }
                },
                null,
                () => {
                    this.cd.markForCheck();
                });
    }
}
