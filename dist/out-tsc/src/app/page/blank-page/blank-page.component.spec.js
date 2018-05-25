"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var blank_page_component_1 = require("./blank-page.component");
var yoComp_module_1 = require("../../core/yoComponent/yoComp.module");
var testing_2 = require("@angular/router/testing");
var yo_search_component_1 = require("../../core/yoComponent/yo-search/yo-search.component");
describe('BlankPageComponent', function () {
    var component;
    var fixture;
    var searchComponent, searchFixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [yoComp_module_1.YoCompModule, testing_2.RouterTestingModule],
            declarations: [blank_page_component_1.BlankPageComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(blank_page_component_1.BlankPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        searchFixture = testing_1.TestBed.createComponent(yo_search_component_1.YoSearchComponent);
        searchComponent = searchFixture.componentInstance;
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=blank-page.component.spec.js.map