﻿import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewsListComponent } from "./news/news-list/news-list.component";
import { authRoutes, authProviders } from "./auth/auth.routing";
import { newsCategoryRoutes } from "./newsCategory/newsCategory.routing";
import { newsRoutes } from "./news/news.routing";
import { userRoutes } from "./user/user.routing";
import { pmRoutes } from "./pm/pm.routing";

const routes: Routes  = [
   // { path: 'signup', component: AccountSignupComponent, canActivate: [AuthGuard] },
    ...authRoutes,
    ...newsCategoryRoutes,
    ...newsRoutes,
    ...pmRoutes,
    ...userRoutes,
    { path: "", component: NewsListComponent }
];

export const appRoutingProviders: any[] = [
    authProviders
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);