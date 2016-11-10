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
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var auth_service_1 = require("./auth/auth.service");
var roles_checked_service_1 = require("./shared/roles-checked.service");
var AppComponent = (function () {
    function AppComponent(router, auth, rolesChecked, viewContainerRef, titleService) {
        this.router = router;
        this.auth = auth;
        this.rolesChecked = rolesChecked;
        this.roles = this.rolesChecked.checkedRoles;
        this.viewContainerRef = viewContainerRef;
        titleService.setTitle("Главная");
    }
    AppComponent.prototype.logout = function () {
        this.auth.logout();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: require("./app.component.html")
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService, roles_checked_service_1.RolesCheckedService, core_1.ViewContainerRef, platform_browser_1.Title])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map