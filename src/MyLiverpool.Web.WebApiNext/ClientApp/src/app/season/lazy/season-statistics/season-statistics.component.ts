import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSelect, MatSelectChange } from "@angular/material/select";
import { SeasonService } from "../../core";
import { PersonStatistics, Season, SeasonStatistics } from "../../model";

@Component({
    selector: "<season-statistics>",
    templateUrl: "./season-statistics.component.html"
})
export class SeasonStatisticsComponent implements OnInit {
    public statistics: PersonStatistics[];
    public seasons: Season[];
    displayedColumns = ["personName", "goals", "assists", "yellows", "reds"];

    @ViewChild("seasonSelect", { static: true })seasonSelect: MatSelect;

    constructor(private seasonService: SeasonService) {

    }

    public ngOnInit(): void {
        this.seasonSelect.selectionChange.subscribe((data: MatSelectChange) => {
            this.update(data.value, false);
        });

        this.seasonService.getAllWithoutFilter()
            .subscribe(data => this.seasons = data.results);

        this.update(0, true);
    }

    private update(id: number, selectUpdate: boolean): void {
        this.seasonService.getStatistics(id)
            .subscribe((data : SeasonStatistics) => {
                this.statistics = data.persons;
                    if (selectUpdate) {
                        this.seasonSelect.value = data.id;
                    }
                });
    }
}