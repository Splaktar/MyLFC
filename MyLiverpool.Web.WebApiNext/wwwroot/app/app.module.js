"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var material_1 = require("@angular/material");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var app_routes_1 = require("./app.routes");
var news_list_component_1 = require("./news/news-list/news-list.component");
var app_constants_1 = require("./app.constants");
var news_detail_component_1 = require("./news/news-detail/news-detail.component");
var account_signup_component_1 = require("./account/account-signup.component");
var news_service_1 = require("./news/shared/news.service");
var news_edit_component_1 = require("./news/news-edit/news-edit.component");
var newsCategory_service_1 = require("./newsCategory/shared/newsCategory.service");
var account_signin_component_1 = require("./account/account-signin.component");
var httpWrapper_1 = require("./shared/httpWrapper");
var index_1 = require("./auth/index");
var index_2 = require("./shared/index");
var account_service_1 = require("./account/account.service");
var newsCategory_list_component_1 = require("./newsCategory/newsCategory-list.component");
var newsCategory_edit_component_1 = require("./newsCategory/newsCategory-edit.component");
var user_detail_component_1 = require("./user/user-detail.component");
var user_service_1 = require("./user/user.service");
var user_list_component_1 = require("./user/user-list.component");
var index_3 = require("./pm/index");
var index_4 = require("./home/index");
var index_5 = require("./wish/index");
var ng2_auto_complete_1 = require("ng2-auto-complete");
var ng2_pagination_1 = require("ng2-pagination");
var ng2_modal_1 = require("ng2-modal");
var index_6 = require("./shared/index");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                material_1.MaterialModule.forRoot(),
                ng2_modal_1.ModalModule,
                ng2_auto_complete_1.Ng2AutoCompleteModule,
                ng2_pagination_1.Ng2PaginationModule,
                forms_1.ReactiveFormsModule,
                app_routes_1.routing],
            declarations: [
                account_signin_component_1.AccountSigninComponent,
                account_signup_component_1.AccountSignupComponent,
                app_component_1.AppComponent,
                index_4.ClubHistoryComponent,
                newsCategory_edit_component_1.NewsCategoryEditComponent,
                newsCategory_list_component_1.NewsCategoryListComponent,
                news_list_component_1.NewsListComponent,
                news_detail_component_1.NewsDetailComponent,
                news_edit_component_1.NewsEditComponent,
                index_3.PmDetailComponent,
                index_3.PmEditComponent,
                index_3.PmListComponent,
                index_2.SecuredDirective,
                user_detail_component_1.UserDetailComponent,
                user_list_component_1.UserListComponent,
                index_5.WishEditComponent,
                index_5.WishListComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                account_service_1.AccountService,
                app_routes_1.appRoutingProviders,
                index_1.AuthGuard,
                index_1.AuthService,
                app_constants_1.Configuration,
                httpWrapper_1.HttpWrapper,
                { provide: index_2.LocalStorageMine, useClass: index_2.LocalStorageMine },
                news_service_1.NewsService,
                newsCategory_service_1.NewsCategoryService,
                index_3.PmService,
                index_6.RolesCheckedService,
                user_service_1.UserService,
                index_5.WishService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map