"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var layout_component_1 = require("./layout.component");
var header_component_1 = require("./components/header/header.component");
var sidebar_component_1 = require("./components/sidebar/sidebar.component");
var router_1 = require("@angular/router");
var testing_2 = require("@angular/router/testing");
describe('LayoutComponent', function () {
    var component;
    var fixture;
    var router;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.RouterTestingModule],
            declarations: [layout_component_1.LayoutComponent, sidebar_component_1.SidebarComponent, header_component_1.HeaderComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(layout_component_1.LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        router = testing_1.TestBed.get(router_1.Router);
    });
    it('should create LayoutComponent include SidebarComponent, HeaderComponent', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=layout.component.spec.js.map