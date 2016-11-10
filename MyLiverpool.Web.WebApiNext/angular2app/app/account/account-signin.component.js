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
var auth_service_1 = require("../auth/auth.service");
var AccountSigninComponent = (function () {
    function AccountSigninComponent(authService, formBuilder) {
        this.authService = authService;
        this.formBuilder = formBuilder;
    }
    AccountSigninComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            'userName': ["", forms_1.Validators.compose([
                    forms_1.Validators.required])],
            'password': ["", forms_1.Validators.compose([
                    forms_1.Validators.required])]
        });
    };
    AccountSigninComponent.prototype.onSubmit = function (ra) {
        this.userName = this.loginForm.controls["userName"].value;
        this.password = this.loginForm.controls["password"].value;
        var result = this.authService.login(this.userName, this.password);
    };
    AccountSigninComponent = __decorate([
        core_1.Component({
            selector: "account-signin",
            template: require("./account-signin.component.html")
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, forms_1.FormBuilder])
    ], AccountSigninComponent);
    return AccountSigninComponent;
}());
exports.AccountSigninComponent = AccountSigninComponent;
//# sourceMappingURL=account-signin.component.js.map