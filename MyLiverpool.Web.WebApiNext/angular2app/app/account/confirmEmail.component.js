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
var account_service_1 = require("./account.service");
var ConfirmEmailComponent = (function () {
    function ConfirmEmailComponent(accountService, route, router) {
        this.accountService = accountService;
        this.route = route;
        this.router = router;
        this.result = false;
    }
    ConfirmEmailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.queryParams.subscribe(function (params) {
            var id = +params["userId"];
            var code = params["code"];
            _this.accountService.confirmEmail(id, code)
                .subscribe(function (data) { return _this.result = data; }, function (error) { return console.log(error); }, function () {
                if (_this.result) {
                }
            });
        });
    };
    ConfirmEmailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ConfirmEmailComponent = __decorate([
        core_1.Component({
            selector: "email-confirmation",
            template: "<span [hidden]='!result'>Ваш адрес электронной почты успешно подтвержден. Можете войти и быть как дома.</span>"
        }), 
        __metadata('design:paramtypes', [account_service_1.AccountService, router_1.ActivatedRoute, router_1.Router])
    ], ConfirmEmailComponent);
    return ConfirmEmailComponent;
}());
exports.ConfirmEmailComponent = ConfirmEmailComponent;
//# sourceMappingURL=confirmEmail.component.js.map