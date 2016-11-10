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
var materialComment_model_1 = require("./materialComment.model");
var materialComment_service_1 = require("./materialComment.service");
var common_1 = require("@angular/common");
var index_1 = require("../shared/index");
var MaterialCommentSectionComponent = (function () {
    function MaterialCommentSectionComponent(materialCommentService, location, rolesChecked, formBuilder) {
        this.materialCommentService = materialCommentService;
        this.location = location;
        this.rolesChecked = rolesChecked;
        this.formBuilder = formBuilder;
        this.items = [];
        this.page = 1;
        this.itemsPerPage = 15;
        this.canCommentary = false;
    }
    MaterialCommentSectionComponent.prototype.ngOnInit = function () {
        this.roles = this.rolesChecked.checkedRoles;
        this.update();
        this.commentForm = this.formBuilder.group({
            'message': ["", forms_1.Validators.compose([
                    forms_1.Validators.required, forms_1.Validators.minLength(3)])]
        });
    };
    MaterialCommentSectionComponent.prototype.pageChanged = function (event) {
        this.page = event.page;
        this.update();
    };
    ;
    MaterialCommentSectionComponent.prototype.update = function () {
        var _this = this;
        this.materialCommentService
            .getAllByMaterial(this.page, this.materialId)
            .subscribe(function (data) { return _this.parsePageable(data); }, function (error) { return console.log(error); }, function () { });
    };
    MaterialCommentSectionComponent.prototype.parsePageable = function (pageable) {
        this.items = pageable.list;
        this.page = pageable.pageNo;
        this.itemsPerPage = pageable.itemPerPage;
        this.totalItems = pageable.totalItems;
    };
    MaterialCommentSectionComponent.prototype.onSubmit = function (value) {
        var _this = this;
        var comment = new materialComment_model_1.MaterialComment();
        comment.message = this.commentForm.controls["message"].value;
        comment.materialId = this.materialId;
        this.materialCommentService.create(comment)
            .subscribe(function (data) {
            _this.items.push(data);
            _this.commentForm.controls["message"].patchValue("");
        }, function (error) { return console.log(error); }, function () { });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MaterialCommentSectionComponent.prototype, "materialId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MaterialCommentSectionComponent.prototype, "canCommentary", void 0);
    MaterialCommentSectionComponent = __decorate([
        core_1.Component({
            selector: "comments",
            template: require("./materialComment-section.component.html")
        }), 
        __metadata('design:paramtypes', [materialComment_service_1.MaterialCommentService, common_1.Location, index_1.RolesCheckedService, forms_1.FormBuilder])
    ], MaterialCommentSectionComponent);
    return MaterialCommentSectionComponent;
}());
exports.MaterialCommentSectionComponent = MaterialCommentSectionComponent;
//# sourceMappingURL=materialComment-section.component.js.map