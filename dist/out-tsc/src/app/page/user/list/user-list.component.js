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
var userModel_1 = require("../model/userModel");
var yoax_service_1 = require("../../../core/yoService/db/yoax.service");
var router_1 = require("@angular/router");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(_ys, _ar, _router) {
        var _this = this;
        this._ys = _ys;
        this._ar = _ar;
        this._router = _router;
        this.model = new userModel_1.UserListModel();
        this.searchObj = this.model.searchObj;
        this.columnDefs = this.model.columnDefs;
        this.rowData = [];
        this._ar.data.subscribe(function (data) {
            _this.rowData = JSON.parse(data.ListResolve._body);
        });
    }
    UserListComponent.prototype.ngOnInit = function () { };
    UserListComponent.prototype.cellClick = function (params) {
        this._router.navigate(['usr-detail/' + params.data.USR_KEY]);
    };
    UserListComponent.prototype.insertUsr = function () {
        this._router.navigate(['usr-detail']);
    };
    UserListComponent.prototype.searchClick = function (params) {
        var _this = this;
        this._ys.yoax('/usr/', 'get', params).subscribe(function (result) {
            _this.rowData = JSON.parse(result._body);
        });
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'app-user-list',
            templateUrl: './user-list.component.html',
            styleUrls: ['./user-list.component.scss']
        }),
        __metadata("design:paramtypes", [yoax_service_1.YoaxService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map