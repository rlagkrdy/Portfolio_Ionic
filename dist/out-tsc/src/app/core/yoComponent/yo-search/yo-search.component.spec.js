"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var yo_search_component_1 = require("./yo-search.component");
var yoComp_module_1 = require("../yoComp.module");
var platform_browser_1 = require("@angular/platform-browser");
var material_module_1 = require("../../ThirdPartModule/material.module");
var DateCtrl_1 = require("../../yoService/ctrl/DateCtrl");
var component;
var fixture;
var isTypes = new RegExp(/select|radio/);
var searchObj = [
    {
        id: 'aa',
        name: 'aa',
        type: 'input',
        value: 'aa'
    },
    {
        id: 'bb',
        name: 'bb',
        type: 'date',
        value: '2018-04-20'
    },
    {
        id: 'dd',
        name: 'dd',
        type: 'select',
        value: 'ddd',
        data: [
            { name: 'aaa', value: 'aaa' },
            { name: 'bbb', value: 'bbb' },
            { name: 'ccc', value: 'ccc' }
        ]
    },
    {
        id: 'ee',
        name: 'ee',
        type: 'radio',
        value: '',
        data: [
            { name: 'aaa', value: 'aaa' },
            { name: 'bbb', value: 'bbb' },
            { name: 'ccc', value: 'ccc' }
        ]
    },
    {
        id: 'ff',
        name: 'ff',
        type: 'check',
        value: '5',
        data: [
            { name: 'aaa', value: '1' },
            { name: 'bbb', value: '2' },
            { name: 'ccc', value: '4' }
        ]
    }
];
describe('SearchComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [yoComp_module_1.YoCompModule, testing_2.RouterTestingModule, material_module_1.MaterialModule]
        }).compileComponents();
    }));
    beforeEach(function (done) {
        fixture = testing_1.TestBed.createComponent(yo_search_component_1.YoSearchComponent);
        component = fixture.componentInstance;
        component['searchObj'] = searchObj;
        setTimeout(function () {
            done();
        }, 0);
        fixture.detectChanges();
    });
    it('SearchComponent가 생성되어야 한다.', function () {
        expect(component).toBeTruthy();
    });
    it('searchObj가 undefind거나 length가 0이라면 formIsShow는 false여야 한다', function () {
        if (!searchObj || searchObj.length === 0) {
            expect(component['formIsShow']).toBe(false);
        }
    });
    it('formIsShow가 false라면 화면은 보여서는 안된다.', function () {
        var formIsShow = component['formIsShow'];
        var searchFormEl = fixture.debugElement.query(platform_browser_1.By.css('.yo-search-session'));
        if (!formIsShow) {
            expect(searchFormEl).toBeFalsy();
        }
    });
    it('searchObj의 length가 0보다 클때 id,name는 존재해야하며, type은 "input, select, radio, check, date"중 하나여야 한다.', function () {
        for (var keys in searchObj) {
            if (searchObj[keys]) {
                expect(searchObj[keys].id).toBeTruthy();
                expect(searchObj[keys].name).toBeTruthy();
                expect(searchObj[keys].type).toMatch(/input|select|radio|check|date/g);
            }
        }
    });
    it('searchObj중에 id값이 중복된다면 formIsShow는 false 여야한다.', function () {
        if (!component['searchObjDuplicate'](searchObj)) {
            expect(component['formIsShow']).toBeFalsy();
        }
    });
    it('searchObj중에 type이 date이면 시작일과 종료일은 value와 같아야한다.', function () {
        var dCtrl = new DateCtrl_1.DateCtrl();
        var expectFunc = function (_form, name, value) {
            var dateName = ['_ST', '_ED'];
            dateName.forEach(function (dateItem) {
                expect(_form.value[name + dateItem]).toBe(value);
            });
        };
        dCtrl.do(searchObj, component.searchForm, expectFunc);
    });
    it('searchObj중에 type이 select, radio, check일때 data가 없으면 false를 return해야한다', function () {
        if (!component['searchObjValid']()) {
            expect(component['formIsShow']).toBeFalsy();
        }
    });
    it('searchObj중에 type이 select, radio일때 value값이 data 배열중에 없으면 첫번째 값을 가져야 한다.', function () {
        var _loop_1 = function (keys) {
            if (isTypes.test(searchObj[keys]['type'])) {
                var value_1 = searchObj[keys]['value'];
                var datas = searchObj[keys]['data'];
                if (value_1 === '' || value_1 === null) {
                    expect(value_1).toBe(datas[0].value);
                }
                else {
                    var valueAr = datas.filter(function (item, idx, arr) {
                        return item.value === value_1;
                    });
                    if (valueAr.length > 0) {
                        expect(value_1).toBe(valueAr[0].value);
                    }
                    else {
                        expect(value_1).toBe(datas[0].value);
                    }
                }
            }
        };
        for (var keys in searchObj) {
            _loop_1(keys);
        }
    });
    it('searchObj중에 type이 check일때 value값에 따라 각 checkbox 요소는 true이거나 false여야 한다', function () {
        searchObj.filter(function (item) { return item.type === 'check'; }).forEach(function (cItem) {
            component.matchk
                .filter(function (matchk_item) { return matchk_item.name === cItem.name; })
                .forEach(function (matchk_item) {
                var demiValue = parseInt(cItem.value, 10);
                var targetValue = parseInt(matchk_item.value, 10);
                if ((demiValue & targetValue) !== 0) {
                    expect(matchk_item.checked).toBeTruthy();
                }
                else {
                    expect(matchk_item.checked).toBeFalsy();
                }
            });
        });
    });
    it('초기화 버튼 클릭시 모든 입력 값이 초기화 되어야 함. select, radio일 겅유 첫 번째  옵션이 선택되어야함', function () {
        component['reset'](component.searchForm);
        var valueObj = component.searchForm['_directives'];
        var selRaArr = searchObj.filter(function (item) { return isTypes.test(item.type); });
        var _loop_2 = function (key) {
            if (valueObj[key]) {
                var isSelRa = selRaArr.filter(function (item) { return valueObj[key].name === item.name; });
                if (isSelRa.length > 0) {
                    expect(valueObj[key].value).toBe(isSelRa[0].data[0].value);
                }
                else {
                    expect(valueObj[key].value).toBeFalsy();
                }
            }
        };
        for (var key in valueObj) {
            _loop_2(key);
        }
    });
    // it('검색버튼 클릭시 ???', () => {
    //     component['search'](component.searchForm);
    // });
});
//# sourceMappingURL=yo-search.component.spec.js.map