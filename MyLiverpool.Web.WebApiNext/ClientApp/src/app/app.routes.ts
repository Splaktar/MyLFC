﻿import { Routes } from "@angular/router";
import { MaterialListComponent } from "./material";
import { homeRoutes } from "./home/home.routes";
import {
    ADMIN_ROUTE,
    WISHES_ROUTE,
    NEWS_ROUTE,
    ACCOUNT_ROUTE,
    BLOGS_ROUTE,
    BLOG_CATEGORIES_ROUTE,
    COMMENTS_ROUTE,
    CLUBS_ROUTE,
    IMAGES_ROUTE,
    INJURIES_ROUTE,
    MATCHES_ROUTE,
    NOTIFICATIONS_ROUTE,
    NEWS_CATEGORIES_ROUTE,
    PERSONS_ROUTE,
    PMS_ROUTE,
    ROLE_GROUPS_ROUTE,
    SEASONS_ROUTE,
    STADIUMS_ROUTE,
    TRANSFERS_ROUTE,
    USERS_ROUTE,
    POLLS_ROUTE,
    TITLE_RU,
    WAL_ROUTE
} from "@app/+constants";

export const routes: Routes = [
    ...homeRoutes,
    {
        path: "editPage",
        loadChildren: "./staticPage/staticPage.module#StaticPageModule"
    },
    {
        path: ACCOUNT_ROUTE,
        loadChildren: "./account/lazy/account.module#AccountModule"
    },
    {
        path: ADMIN_ROUTE,
        loadChildren: "./admin/lazy/admin.module#AdminModule"
    },
    {
        path: BLOGS_ROUTE,
        loadChildren: "./material/lazy/material.module#MaterialModule"
    },
    {
        path: BLOG_CATEGORIES_ROUTE,
        loadChildren: "./materialCategory/lazy/materialCategory.module#MaterialCategoryModule"
    },
    {
        path: COMMENTS_ROUTE,
        loadChildren: "./comment/lazy/comment.module#CommentModule"
    },
    {
        path: CLUBS_ROUTE,
        loadChildren: "./club/lazy/club.module#ClubModule"
    },
    {
        path: IMAGES_ROUTE,
        loadChildren: "./image/lazy/image.module#ImageModule"
    },
    {
        path: INJURIES_ROUTE,
        loadChildren: "./injury/lazy/injury.module#InjuryModule"
    },
    {
        path: MATCHES_ROUTE,
        loadChildren: "./match/lazy/match.module#MatchModule"
    },
    {
        path: NEWS_ROUTE,
        loadChildren: "./material/lazy/material.module#MaterialModule"
    },
    {
        path: NEWS_CATEGORIES_ROUTE,
        loadChildren: "./materialCategory/lazy/materialCategory.module#MaterialCategoryModule"
    },
    {
        path: NOTIFICATIONS_ROUTE,
        loadChildren: "./notification/lazy/notification.module#NotificationModule"
    },
    {
        path: PERSONS_ROUTE,
        loadChildren: "./person/lazy/person.module#PersonModule"
    },
    {
        path: PMS_ROUTE,
        loadChildren: "./pm/lazy/pm.module#PmModule"
    },
    {
        path: POLLS_ROUTE,
        loadChildren: "./poll/lazy/poll.module#PollModule"
    },
    {
        path: ROLE_GROUPS_ROUTE,
        loadChildren: "./roleGroup/lazy/roleGroup.module#RoleGroupModule"
    },
    {
        path: SEASONS_ROUTE,
        loadChildren: "./season/lazy/season.module#SeasonModule"
    },
    {
        path: STADIUMS_ROUTE,
        loadChildren: "./stadium/lazy/stadium.module#StadiumModule"
    },
    {
        path: TRANSFERS_ROUTE,
        loadChildren: "./transfer/lazy/transfer.module#TransferModule"
    },
    {
        path: USERS_ROUTE,
        loadChildren: "./user/lazy/user.module#UserModule"
    },
    {
        path: WAL_ROUTE,
     //   loadChildren: () => import("./wal/lazy/wal.module").then(m => m.WalModule)
        loadChildren: "./wal/lazy/wal.module#WalModule"
    },
    {
        path: WISHES_ROUTE,
     //   loadChildren: () => import("./wish/lazy/wish.module").then(m => m.WishModule)
        loadChildren: "./wish/lazy/wish.module#WishModule"
    },
    {
        path: "",
        component: MaterialListComponent,
        data: {
            title: TITLE_RU,
            keywords: "ливерпуль, liverpool, лфк, фк ливерпуль, liverpool fc, lfc, клуб ливерпуль, ливерпуль фан, сайт ливерпуля, матч ливерпуля, ливерпуль обсуждение",
            description: "Сайт футбольного клуба Ливерпуль. FC Liverpool. Новости, матчи, история, таблицы, статистика, статьи, составы. Русскоязычные болельщики."
        },
        runGuardsAndResolvers: "always"
    }
];