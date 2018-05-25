"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var login_component_1 = require("./login.component");
var testing_2 = require("@angular/router/testing");
var animations_1 = require("@angular/platform-browser/animations");
describe('LoginComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [animations_1.BrowserAnimationsModule, animations_1.NoopAnimationsModule, testing_2.RouterTestingModule],
            declarations: [login_component_1.LoginComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(login_component_1.LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=login.component.spec.js.map