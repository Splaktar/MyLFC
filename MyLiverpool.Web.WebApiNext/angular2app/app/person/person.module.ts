﻿import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PersonListComponent } from "./person-list.component";
import { PersonEditComponent } from "./person-edit.component";
import { PersonService } from "./person.service";
import { TransferService } from "./transfer.service";
import { PlayerStatisticsComponent } from "./player-statistics.component";
import { BestPlayerComponent } from "./best-player.component";
import { StuffListComponent } from "./stuff-list.component";
import { TransferListComponent } from "./transfer-list.component";
import { TransferCurrentListComponent } from "./transfer-current-list.component";
import { TransferEditComponent  } from "./transfer-edit.component";
import { SquadComponent } from "./squad.component";
import { personRoutes } from "./person.routes";
import { SharedModule } from "../shared/index";
import {
    MdButtonModule,
    MdInputModule,
    MdSelectModule,
    MdCardModule,
    MdSlideToggleModule,
    MdNativeDateModule,
    MdDatepickerModule
} from "@angular/material";
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2AutoCompleteModule } from "ng2-auto-complete";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdButtonModule,
        MdCardModule,
        MdDatepickerModule,
        MdInputModule,
        MdNativeDateModule,
        MdSelectModule,
        MdSlideToggleModule,
Ng2AutoCompleteModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        RouterModule.forRoot(personRoutes),
        SharedModule
    ],
    declarations: [
        BestPlayerComponent,
        PersonEditComponent,
        PersonListComponent,
        PlayerStatisticsComponent,
        SquadComponent,
        StuffListComponent,
        TransferListComponent,
        TransferCurrentListComponent,
        TransferEditComponent 
    ],
    exports: [
        BestPlayerComponent
    ],
    providers: [
        PersonService,
        TransferService
    ]
})
export class PersonModule { }