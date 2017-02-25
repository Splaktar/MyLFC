﻿import { Routes } from "@angular/router";
import { PlayerStatisticsComponent } from "./player-statistics.component";
import { PersonListComponent } from "./person-list.component";
import { PersonEditComponent } from "./person-edit.component";

export const personRoutes: Routes = [
    { path: "player/statistics", component: PlayerStatisticsComponent, data: { title: "Статистика игроков" } },
    {
        path: "person",
        children: [
            { path: "", component: PersonListComponent, data: { title: "Люди" },  },
            { path: ":id/edit", component: PersonEditComponent, data: { title: "Редактирование человека" },  },
        ]
    }
    //  { path: "calendar", component: MatchCalendarComponent, data: { title: "Календарь" } }
];