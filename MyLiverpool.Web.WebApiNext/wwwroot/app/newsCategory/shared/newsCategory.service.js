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
const core_1 = require('@angular/core');
require('rxjs/add/operator/map');
const app_constants_1 = require('../../app.constants');
const httpWrapper_1 = require("../../shared/httpWrapper");
let NewsCategoryService = class NewsCategoryService {
    constructor(http, configuration) {
        this.http = http;
        this.configuration = configuration;
        this.GetAll = () => {
            return this.http.get(this.actionUrl).map(res => res.json());
        };
        this.GetSingle = (id) => {
            return this.http.get(this.actionUrl + id).map(res => res.json());
        };
        this.Add = (item) => {
            var toAdd = JSON.stringify({ ItemName: item });
            return this.http.post(this.actionUrl, JSON.stringify(item)).map(res => res.json());
        };
        this.Update = (id, itemToUpdate) => {
            // var toUpdate = 
            return this.http.put(this.actionUrl + id, JSON.stringify(itemToUpdate))
                .map(res => res.json());
        };
        this.Delete = (id) => {
            return this.http.delete(this.actionUrl + id).map(response => response.json());
        };
        this.actionUrl = configuration.ServerWithApiUrl + 'newsCategory/';
    }
    extractData(res) {
        let body = res.json();
        return body.data || {};
    }
};
NewsCategoryService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [httpWrapper_1.HttpWrapper, app_constants_1.Configuration])
], NewsCategoryService);
exports.NewsCategoryService = NewsCategoryService;
//# sourceMappingURL=newsCategory.service.js.map