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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var yoax_service_1 = require("../../yoService/db/yoax.service");
var ListDataResolve = /** @class */ (function () {
    function ListDataResolve(_as) {
        this._as = _as;
    }
    ListDataResolve.prototype.resolve = function (route, state) {
        var param;
        if (route.params) {
            param = Object.assign(route.params);
        }
        if (route.queryParams) {
            param = Object.assign(param, route.queryParams);
        }
        console.log(param);
        var url = route.routeConfig.path.split('-list')[0];
        url = '/' + url + '/';
        return this._as.yoax(url, 'get', param);
    };
    ListDataResolve = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [yoax_service_1.YoaxService])
    ], ListDataResolve);
    return ListDataResolve;
}());
exports.ListDataResolve = ListDataResolve;
//# sourceMappingURL=list-data.resolve.js.map