﻿import { Injectable } from "@angular/core";
import { NEWS_ROUTE, SEASONS_ROUTE, BLOGS_ROUTE, NEWS_CATEGORIES_ROUTE, BLOG_CATEGORIES_ROUTE, USERS_ROUTE,
    NOTIFICATIONS_ROUTE,
    ROLE_GROUPS_ROUTE,
    PERSONS_ROUTE,
    PMS_ROUTE,
    ACCOUNT_ROUTE,
    CLUBS_ROUTE,
    MATCHES_ROUTE,
    EDIT_ROUTE,
    WISHES_ROUTE,
    IMAGES_ROUTE,
    COMMENTS_ROUTE,
    TRANSFERS_ROUTE,
    INJURIES_ROUTE,
    STADIUMS_ROUTE,
    POLLS_ROUTE
} from "@app/+constants";
import { EDITING_RU, WISHES_RU, USERS_RU, USER_RU, CALENDAR_RU, STATISTICS_RU, INJURIES_RU, TRANSFERS_RU, COMMENTS_RU } from "@app/+constants/ru.constants";

@Injectable()
export class BreadcrumbService {
    constructor() {
        this.setUpBreadcrumbs();
    }

    private routesFriendlyNames: Map<string, string> = new Map<string, string>();
    private routesFriendlyNamesRegex: Map<string, string> = new Map<string, string>();
    private routesWithCallback: Map<string, (string: string) => string> = new Map<string, (string: string) => string>();
    private routesWithCallbackRegex: Map<string, (string: string) => string> = new Map<string, (string: string) => string>();
    private hideRoutes: Array<string> = new Array<string>();
    private hideRoutesRegex: Array<string> = new Array<string>();

    /**
     * Specify a friendly name for the corresponding route.
     *
     * @param route
     * @param name
     */
    addFriendlyNameForRoute(route: string, name: string): void {
        this.routesFriendlyNames.set(route, name);
    }

    /**
     * Specify a friendly name for the corresponding route matching a regular expression.
     *
     * @param route
     * @param name
     */
    addFriendlyNameForRouteRegex(routeRegex: string, name: string): void {
        this.routesFriendlyNamesRegex.set(routeRegex, name);
    }

    /**
     * Specify a callback for the corresponding route.
     * When a mathing url is navigatedd to, the callback function is invoked to get the name to be displayed in the breadcrumb.
     */
    addCallbackForRoute(route: string, callback: (id: string) => string): void {
        this.routesWithCallback.set(route, callback);
    }

    /**
     * Specify a callback for the corresponding route matching a regular expression.
     * When a mathing url is navigatedd to, the callback function is invoked to get the name to be displayed in the breadcrumb.
     */
    addCallbackForRouteRegex(routeRegex: string, callback: (id: string) => string): void {
        this.routesWithCallbackRegex.set(routeRegex, callback);
    }

    /**
     * Show the friendly name for a given route (url). If no match is found the url (without the leading '/') is shown.
     *
     * @param route
     * @returns {*}
     */
    getFriendlyNameForRoute(route: string): string {
        route = route.toString();
        let name: string;
        const routeEnd = route.substr(route.lastIndexOf("/") + 1, route.length);

        this.routesFriendlyNames.forEach((value, key, map) => {
            if (key === route) {
                name = value;
            }
        });

        this.routesFriendlyNamesRegex.forEach((value, key, map) => {
            if (new RegExp(key).exec(route)) {
                name = value;
            }
        });

        this.routesWithCallback.forEach((value, key, map) => {
            if (key === route) {
                name = value(routeEnd);
            }
        });

        this.routesWithCallbackRegex.forEach((value, key, map) => {
            if (new RegExp(key).exec(route)) {
                name = value(routeEnd);
            }
        });
        return name ? name : routeEnd;
    }

    /**
     * Specify a route (url) that should not be shown in the breadcrumb.
     */
    hideRoute(route: string): void {
        if (!this.hideRoutes.includes(route)) {
            this.hideRoutes.push(route);
        }
    }

    /**
     * Specify a route (url) regular expression that should not be shown in the breadcrumb.
     */
    hideRouteRegex(routeRegex: string): void {
        if (!this.hideRoutesRegex.includes(routeRegex)) {
            this.hideRoutesRegex.push(routeRegex);
        }
    }

    /**
     * Returns true if a route should be hidden.
     */
    isRouteHidden(route: string): boolean {
        let hide = this.hideRoutes.includes(route);

        this.hideRoutesRegex.forEach((value) => {
            if (new RegExp(value).exec(route)) {
                hide = true;
            }
        });

        return hide;
    }

    private setUpBreadcrumbs(): void {
        //this.addFriendlyNameForRoute("/", "Главная");


        //this.addFriendlyNameForRoute("/forum", "Форум");
        //this.addFriendlyNameForRouteRegex("^/forum/[0-9]+$", "Подсекция");
        //this.hideRouteRegex("^/forum/[0-9]+/themes$");
        //this.addFriendlyNameForRouteRegex("^/forum/[0-9]+/themes/[0-9]+$", "Тема");

        this.addFriendlyNameForRouteRegex(`/${NEWS_ROUTE}`, "Новости");
        this.addFriendlyNameForRouteRegex(`^/${NEWS_ROUTE}/[0-9]+$`, "Новость"); // this.addCallbackForRouteRegex("^/news/[0-9]+$", this.getTitle);
        //    this.addFriendlyNameForRouteRegex("^/news/[0-9]+/edit$", "Редактирование");
        this.addFriendlyNameForRouteRegex(`/${NEWS_CATEGORIES_ROUTE}`, "Категории новостей");
        this.hideRouteRegex(`^/${NEWS_CATEGORIES_ROUTE}/[0-9]+$`); // this.addCallbackForRouteRegex("^/blog/[0-9]+$", this.getTitle);
        //    this.addFriendlyNameForRouteRegex("^/newsCategories/[0-9]+/edit$", "Редактирование");

        this.addFriendlyNameForRouteRegex(`/${BLOGS_ROUTE}`, "Блоги");
        this.addFriendlyNameForRouteRegex(`^/${BLOGS_ROUTE}/[0-9]+$`, "Блог"); // this.addCallbackForRouteRegex("^/blog/[0-9]+$", this.getTitle);
        //    this.addFriendlyNameForRouteRegex("^/blogs/[0-9]+/edit$", "Редактирование");
        this.addFriendlyNameForRouteRegex(`/${BLOG_CATEGORIES_ROUTE}`, "Категории блогов");
        this.hideRouteRegex(`^/${BLOG_CATEGORIES_ROUTE}/[0-9]+$`); // this.addCallbackForRouteRegex("^/blog/[0-9]+$", this.getTitle);
        //    this.addFriendlyNameForRouteRegex("^/blogCategories/[0-9]+/edit$", "Редактирование");


        this.addFriendlyNameForRouteRegex(`/${SEASONS_ROUTE}`, "Сезоны");
        this.addFriendlyNameForRoute(`/${SEASONS_ROUTE}/calendar`, CALENDAR_RU);
        this.addFriendlyNameForRouteRegex(`/${SEASONS_ROUTE}/[0-9]+/calendar`, CALENDAR_RU);
        this.addFriendlyNameForRoute(`/${SEASONS_ROUTE}/statistics`, STATISTICS_RU);
        this.hideRouteRegex(`^/${SEASONS_ROUTE}/[0-9]+$`); //  this.addFriendlyNameForRouteRegex("^/season/[0-9]+$", "Сезон");
        //   this.addFriendlyNameForRouteRegex("^/season/[0-9]+/edit$", "Редактирование");

        //  this.addFriendlyNameForRoute("/players", "Игроки");

        this.addFriendlyNameForRouteRegex(`/${USERS_ROUTE}`, USERS_RU);
        this.addFriendlyNameForRouteRegex(`^/${USERS_ROUTE}/[0-9]+$`, USER_RU);
        this.addFriendlyNameForRouteRegex(`^/${USERS_ROUTE}/[0-9]+/settings$`, "Настройки");
        //    this.addFriendlyNameForRouteRegex("^/users/[0-9]+/edit$", "Редактирование");


        this.addFriendlyNameForRoute(`/${NOTIFICATIONS_ROUTE}`, "Уведомления");

        this.addFriendlyNameForRoute(`/${ROLE_GROUPS_ROUTE}`, "Группы и роли");

        this.addFriendlyNameForRouteRegex(`/${WISHES_ROUTE}`, WISHES_RU);
        this.hideRouteRegex(`^/${WISHES_ROUTE}/[0-9]+$`); // this.addCallbackForRouteRegex("^/news/[0-9]+$", this.getTitle);
        //    this.addFriendlyNameForRouteRegex("^/wishes/[0-9]+/edit$", "Редактирование");

        this.addFriendlyNameForRouteRegex(`/${MATCHES_ROUTE}`, "Матчи");
        this.addFriendlyNameForRouteRegex(`^/${MATCHES_ROUTE}/[0-9]+$`, "Матч"); // this.addCallbackForRouteRegex("^/news/[0-9]+$", this.getTitle);
        //   this.addFriendlyNameForRouteRegex("^/matches/[0-9]+/edit$", "Редактирование");

        this.addFriendlyNameForRouteRegex(`/${CLUBS_ROUTE}`, "Клубы");
        this.hideRouteRegex(`^/${CLUBS_ROUTE}/[0-9]+$`); // this.addCallbackForRouteRegex("^/news/[0-9]+$", this.getTitle);
        //  this.addFriendlyNameForRouteRegex("^/clubs/[0-9]+/edit$", "Редактирование");

        this.addFriendlyNameForRouteRegex(`/${PERSONS_ROUTE}`, "Люди");
        this.hideRouteRegex(`^/${PERSONS_ROUTE}/[0-9]+$`); // this.addCallbackForRouteRegex("^/news/[0-9]+$", this.getTitle);
        //   this.addFriendlyNameForRouteRegex("^/persons/[0-9]+/edit$", "Редактирование");
        this.addFriendlyNameForRoute(`/${PERSONS_ROUTE}/stuff`, "Тренерский штаб");
        this.addFriendlyNameForRoute(`/${PERSONS_ROUTE}/stuff/first`, "Первая команда");
        this.addFriendlyNameForRoute(`/${PERSONS_ROUTE}/stuff/academy`, "Академия");
        this.addFriendlyNameForRoute(`/${PERSONS_ROUTE}/squad`, "Состав");
        this.addFriendlyNameForRoute(`/${PERSONS_ROUTE}/squad/first`, "Первая команда");
        this.addFriendlyNameForRoute(`/${PERSONS_ROUTE}/squad/academy`, "Академия");
        this.addFriendlyNameForRoute(`/${PERSONS_ROUTE}/squad/loan`, "В аренде");

        this.addFriendlyNameForRouteRegex(`/${IMAGES_ROUTE}`, "Изображения");

        this.addFriendlyNameForRouteRegex(`/${COMMENTS_ROUTE}`, COMMENTS_RU);

        this.addFriendlyNameForRouteRegex(`/${PMS_ROUTE}`, "Личные сообщения");
        this.addFriendlyNameForRouteRegex(`/${PMS_ROUTE}/[0-9]+$`, "Сообщение");

        this.hideRouteRegex(`^/${ACCOUNT_ROUTE}$`);
        this.addFriendlyNameForRoute(`/${ACCOUNT_ROUTE}/signup`, "Регистрация");
        this.addFriendlyNameForRouteRegex(`/${ACCOUNT_ROUTE}/confirmEmail`, "Подтверждение пароля");
        this.addFriendlyNameForRoute(`/${ACCOUNT_ROUTE}/forgotPassword`, "Восстановление забытого пароля");
        this.addFriendlyNameForRoute(`/${ACCOUNT_ROUTE}/unconfirmedEmail`, "Ваша почта не подтверждена");
        this.addFriendlyNameForRouteRegex(`/${ACCOUNT_ROUTE}/resetPassword`, "Сброс пароля");
        this.addFriendlyNameForRoute(`/${ACCOUNT_ROUTE}/changePassword`, "Изменение пароля");


        this.addFriendlyNameForRouteRegex(`/${TRANSFERS_ROUTE}`, TRANSFERS_RU);
        this.addFriendlyNameForRoute(`/${TRANSFERS_ROUTE}/current`, "Текущие");
        this.hideRouteRegex(`^/${TRANSFERS_ROUTE}/[0-9]+$`); // this.addCallbackForRouteRegex("^/news/[0-9]+$", this.getTitle);
        // this.addFriendlyNameForRouteRegex("^/${INJURIES_ROUTE}/[0-9]+/edit$", "Редактирование");


        this.addFriendlyNameForRouteRegex(`/${INJURIES_ROUTE}`, INJURIES_RU);
        this.hideRouteRegex(`^/${INJURIES_ROUTE}/[0-9]+$`); // this.addCallbackForRouteRegex("^/blog/[0-9]+$", this.getTitle);
        //    this.addFriendlyNameForRouteRegex("^/injuries/[0-9]+/edit$", "Редактирование");

        this.addFriendlyNameForRouteRegex(`/${STADIUMS_ROUTE}`, "Стадионы");
        this.hideRouteRegex(`^/${STADIUMS_ROUTE}/[0-9]+$`); // this.addCallbackForRouteRegex("^/news/[0-9]+$", this.getTitle);
        //   this.addFriendlyNameForRouteRegex("^/stadiums/[0-9]+/edit$", "Редактирование");

        this.addFriendlyNameForRoute("/about", "О нас");
        this.addFriendlyNameForRoute("/aboutClub", "О клубе");
        this.addFriendlyNameForRoute("/chat", "Чат");
        this.addFriendlyNameForRoute("/clubHistory", "История клуба");
        this.addFriendlyNameForRoute("/cooperation", "Сотрудничество");
        this.addFriendlyNameForRoute("/copyright", "О перепечатке информации");
        this.addFriendlyNameForRoute("/fantasy", "Fantasy Лига MyLFC");
        this.addFriendlyNameForRoute("/instructions", "Инструкции");
        this.addFriendlyNameForRoute("/job", "Работа на сайте");
        this.addFriendlyNameForRoute("/plans", "Планы");
        this.addFriendlyNameForRoute("/rules", "Правила");

        this.addFriendlyNameForRoute("/editPage", "Редактирование страницы");
        this.hideRouteRegex("^/editPage/[0-9]+$");


        this.addFriendlyNameForRoute(`/${POLLS_ROUTE}`, "Опросы");
        this.addFriendlyNameForRoute(`^/${POLLS_ROUTE}/[0-9]+$`, "Опрос");

        this.addFriendlyNameForRouteRegex(`^/[a-zA-Z]+/[0-9]+/${EDIT_ROUTE}`, EDITING_RU);
    }
}
