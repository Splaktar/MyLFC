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
var admin_service_1 = require("../admin/admin.service");
var index_1 = require("../shared/index");
var RightSidebarComponent = (function () {
    function RightSidebarComponent(service, rolesChecked) {
        this.service = service;
        this.rolesChecked = rolesChecked;
    }
    RightSidebarComponent.prototype.ngOnInit = function () {
        this.roles = this.rolesChecked.checkedRoles;
    };
    RightSidebarComponent.prototype.updateEplTable = function () {
        this.service
            .updateEplTable()
            .subscribe(function (data) {
            if (data) {
            }
        }, function (error) { return console.log(error); }, function () { return console.log(""); });
    };
    RightSidebarComponent = __decorate([
        core_1.Component({
            selector: "right-sidebar",
            template: require("./rightSidebar.component.html")
        }), 
        __metadata('design:paramtypes', [admin_service_1.AdminService, index_1.RolesCheckedService])
    ], RightSidebarComponent);
    return RightSidebarComponent;
}());
exports.RightSidebarComponent = RightSidebarComponent;
//# sourceMappingURL=rightSidebar.component.js.map