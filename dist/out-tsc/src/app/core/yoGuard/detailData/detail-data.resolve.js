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
var DetailDataResolve = /** @class */ (function () {
    function DetailDataResolve(_as) {
        this._as = _as;
    }
    DetailDataResolve.prototype.resolve = function (route, state) {
        console.log(route);
        var url = route.routeConfig.path.split('-detail/:id')[0];
        url = '/' + url + '/' + route.params.id;
        return this._as.yoax(url, 'get', route.queryParams);
    };
    DetailDataResolve = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [yoax_service_1.YoaxService])
    ], DetailDataResolve);
    return DetailDataResolve;
}());
exports.DetailDataResolve = DetailDataResolve;
//# sourceMappingURL=detail-data.resolve.js.map