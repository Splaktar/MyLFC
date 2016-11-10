﻿import { Routes }         from '@angular/router';
import {NewsCategoryListComponent} from "./newsCategory-list.component";
import {NewsCategoryEditComponent} from "./newsCategory-edit.component";
export const newsCategoryRoutes: Routes = [
    { path: 'newsCategory', component: NewsCategoryListComponent }, //todo, canActivate: [AuthGuard]  }
    { path: 'newsCategory/:id/edit', component: NewsCategoryEditComponent }
];