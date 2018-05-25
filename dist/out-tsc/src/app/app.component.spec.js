"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var common_1 = require("@angular/common");
var testing_2 = require("@angular/router/testing");
var router_1 = require("@angular/router");
var layout_module_1 = require("./layout/layout.module");
var core_1 = require("@angular/core");
var login_module_1 = require("./page/login/login.module");
var not_found_module_1 = require("./page/not-found/not-found.module");
describe('AppComponent', function () {
    var component;
    var fixture;
    var router;
    var location;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [app_routing_module_1.AppRoutingModule, testing_2.RouterTestingModule.withRoutes(app_routing_module_1.routes)],
            declarations: [app_component_1.AppComponent]
        }).compileComponents();
    }));
    // AppRoutingModule를 Import안시켜 주면 router-outlet태그에러 발생
    // router를 추가 해주었는데 경로가 안 잡혀 있으면 경로를 알수 없기 때문에
    // 기본 경로 추가
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        component = fixture.componentInstance;
        location = testing_1.TestBed.get(common_1.Location);
        router = testing_1.TestBed.get(router_1.Router);
        var loader = testing_1.TestBed.get(core_1.NgModuleFactoryLoader);
        loader.stubbedModules = {
            LayoutModule: layout_module_1.LayoutModule,
            LoginModule: login_module_1.LoginModule,
            NotFoundModule: not_found_module_1.NotFoundModule
        };
        router.resetConfig([
            { path: '', loadChildren: 'LayoutModule' },
            { path: 'login', loadChildren: 'LoginModule' },
            { path: 'not-found', loadChildren: 'NotFoundModule' }
        ]);
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('navigate to "/", it should be "/"', testing_1.fakeAsync(function () {
        router.navigate(['']).then(function () {
            testing_1.tick();
            expect(location.path()).toBe('/');
        });
    }));
    it('navigate to "/login", it should be "/login"', testing_1.fakeAsync(function () {
        router.navigate(['login']).then(function () {
            expect(location.path()).toBe('/login');
        });
    }));
    it('navigate to "/login", it should be "/login"', testing_1.fakeAsync(function () {
        router.navigate(['login']).then(function () {
            expect(location.path()).toBe('/login');
        });
    }));
    it('navigate to "/not-found", it should be "/not-found"', testing_1.fakeAsync(function () {
        router.navigate(['not-found']).then(function () {
            expect(location.path()).toBe('/not-found');
        });
    }));
});
//# sourceMappingURL=app.component.spec.js.map