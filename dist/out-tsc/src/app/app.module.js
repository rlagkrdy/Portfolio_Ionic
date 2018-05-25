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
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var auth_guard_1 = require("./core/yoGuard/auth.guard");
var param_service_1 = require("./core/yoService/utils/params/param.service");
var regex_service_1 = require("./core/yoService/utils/regex/regex.service");
var yoax_service_1 = require("./core/yoService/db/yoax.service");
var http_2 = require("@angular/http");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                http_2.HttpModule
            ],
            declarations: [app_component_1.AppComponent],
            providers: [auth_guard_1.AuthGuard, param_service_1.ParamUtils, regex_service_1.RegexUtils, yoax_service_1.YoaxService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map