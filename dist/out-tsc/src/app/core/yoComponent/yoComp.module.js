"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ag_grid_angular_1 = require("ag-grid-angular");
var forms_1 = require("@angular/forms");
var material_module_1 = require("../ThirdPartModule/material.module");
var yo_grid_component_1 = require("./yo-grid/yo-grid.component");
var yo_search_component_1 = require("./yo-search/yo-search.component");
var yo_detail_component_1 = require("./yo-detail/yo-detail.component");
var yoCtrl_module_1 = require("../yoService/ctrl/yoCtrl.module");
var YoCompModule = /** @class */ (function () {
    function YoCompModule() {
    }
    YoCompModule = __decorate([
        core_1.NgModule({
            declarations: [yo_grid_component_1.YoGridComponent, yo_search_component_1.YoSearchComponent, yo_detail_component_1.YoDetailComponent],
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                ag_grid_angular_1.AgGridModule.withComponents([yo_grid_component_1.YoGridComponent]),
                material_module_1.MaterialModule,
                yoCtrl_module_1.YoCtrlModule
            ],
            exports: [yo_grid_component_1.YoGridComponent, yo_search_component_1.YoSearchComponent, yo_detail_component_1.YoDetailComponent, material_module_1.MaterialModule]
        })
    ], YoCompModule);
    return YoCompModule;
}());
exports.YoCompModule = YoCompModule;
//# sourceMappingURL=yoComp.module.js.map