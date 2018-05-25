"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var layout_component_1 = require("./layout.component");
var yoComp_module_1 = require("../core/yoComponent/yoComp.module");
var blank_page_component_1 = require("../page/blank-page/blank-page.component");
var user_list_component_1 = require("../page/user/list/user-list.component");
var list_data_resolve_1 = require("../core/yoGuard/listData/list-data.resolve");
var user_detail_component_1 = require("../page/user/detail/user-detail.component");
var detail_data_resolve_1 = require("../core/yoGuard/detailData/detail-data.resolve");
var common_1 = require("@angular/common");
var routes = [
    {
        path: '',
        component: layout_component_1.LayoutComponent,
        children: [
            {
                path: 'blank-page',
                component: blank_page_component_1.BlankPageComponent,
                resolve: { ListResolve: list_data_resolve_1.ListDataResolve }
            },
            {
                path: 'usr-list',
                component: user_list_component_1.UserListComponent,
                resolve: { ListResolve: list_data_resolve_1.ListDataResolve }
            },
            {
                path: 'usr-detail/:id',
                component: user_detail_component_1.UserDetailComponent,
                resolve: { DetailResolve: detail_data_resolve_1.DetailDataResolve }
            },
            {
                path: 'usr-detail',
                component: user_detail_component_1.UserDetailComponent
            }
        ]
    }
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        core_1.NgModule({
            declarations: [blank_page_component_1.BlankPageComponent, user_list_component_1.UserListComponent, user_detail_component_1.UserDetailComponent],
            providers: [list_data_resolve_1.ListDataResolve, detail_data_resolve_1.DetailDataResolve],
            imports: [common_1.CommonModule, router_1.RouterModule.forChild(routes), yoComp_module_1.YoCompModule],
            exports: [router_1.RouterModule]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());
exports.LayoutRoutingModule = LayoutRoutingModule;
//# sourceMappingURL=layout-routing.module.js.map