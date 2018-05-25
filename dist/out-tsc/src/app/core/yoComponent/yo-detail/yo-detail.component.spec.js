"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var yoComp_module_1 = require("../yoComp.module");
var userModel_1 = require("../../../page/user/model/userModel");
var yo_detail_component_1 = require("./yo-detail.component");
var material_module_1 = require("../../ThirdPartModule/material.module");
var param_service_1 = require("../../yoService/utils/params/param.service");
var regex_service_1 = require("../../yoService/utils/regex/regex.service");
var component;
var fixture;
var usrModel = new userModel_1.UserDetailModel();
var usrObj = usrModel.usrObj;
var usrData = {
    USR_NAME: '김학요',
    USR_ID: 'RLAGKRDY',
    USR_TEL: '01000000000',
    USR_SNS_WAY: 0
};
describe('YoDetailComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [yoComp_module_1.YoCompModule, testing_2.RouterTestingModule, material_module_1.MaterialModule]
        }).compileComponents();
    }));
    beforeEach(function (done) {
        fixture = testing_1.TestBed.createComponent(yo_detail_component_1.YoDetailComponent);
        component = fixture.componentInstance;
        component['detailObj'] = usrObj;
        component['detailObjData'] = usrData;
        setTimeout(function () {
            done();
        }, 0);
        fixture.detectChanges();
    });
    it('YoDetailComponent가 생성되어야 한다.', function () {
        expect(component).toBeTruthy();
    });
    it('customFormValid() :: form directives에 errors가 있다면 return false 아니면 true', function () {
        var form = component.detailForm['_directives'];
        var pu = new param_service_1.ParamUtils(new regex_service_1.RegexUtils());
        var result = pu.customFormValid(form);
        expect(result).toBeFalsy();
    });
});
//# sourceMappingURL=yo-detail.component.spec.js.map