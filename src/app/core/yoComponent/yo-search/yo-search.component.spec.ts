import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { YoSearchComponent, SearchObj } from './yo-search.component';
import { YoCompModule } from '../yoComp.module';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../../ThirdPartModule/material.module';
import { NgForm } from '@angular/forms';
import { ParamUtils } from '../../yoService/utils/params/param.service';
import { CheckCtrl } from '../../yoService/uiCtrl/CheckCtrl';
import { SelRaCtrl } from '../../yoService/uiCtrl/SelRaCtrl';
import { DateCtrl } from '../../yoService/uiCtrl/DateCtrl';

let component: YoSearchComponent;
let fixture: ComponentFixture<YoSearchComponent>;
const isTypes: RegExp = new RegExp(/select|radio/);
const searchObj: Array<SearchObj> = [
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

describe('SearchComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [YoCompModule, RouterTestingModule, MaterialModule],
            providers: [ParamUtils, CheckCtrl, DateCtrl, SelRaCtrl]
        }).compileComponents();
    }));

    beforeEach(done => {
        fixture = TestBed.createComponent(YoSearchComponent);
        component = fixture.componentInstance;
        component['searchObj'] = searchObj;
        fixture.detectChanges();
        fixture.whenRenderingDone().then(() => {
            done();
        });
    });

    it('SearchComponent가 생성되어야 한다.', () => {
        expect(component).toBeTruthy();
    });

    it('searchObj가 undefind거나 length가 0이라면 formIsShow는 false여야 한다', () => {
        if (!searchObj || searchObj.length === 0) {
            expect(component['formIsShow']).toBe(false);
        }
    });

    it('formIsShow가 false라면 화면은 보여서는 안된다.', () => {
        const formIsShow: boolean = component['formIsShow'];
        const searchFormEl = fixture.debugElement.query(
            By.css('.yo-search-session')
        );
        if (!formIsShow) {
            expect(searchFormEl).toBeFalsy();
        }
    });

    it('searchObj의 length가 0보다 클때 id,name는 존재해야하며, type은 "input, select, radio, check, date"중 하나여야 한다.', () => {
        for (const keys in searchObj) {
            if (searchObj[keys]) {
                expect(searchObj[keys].id).toBeTruthy();
                expect(searchObj[keys].name).toBeTruthy();
                expect(searchObj[keys].type).toMatch(
                    /input|select|radio|check|date/g
                );
            }
        }
    });

    it('searchObj중에 type이 date이면 시작일과 종료일은 value와 같아야한다.', () => {
        component['initUiCtrl']();
        const dCtrl: DateCtrl = new DateCtrl();
        const expectFunc = (_form: NgForm, name: string, value: string) => {
            const dateName: Array<string> = ['_ST', '_ED'];
            dateName.forEach(dateItem => {
                expect(_form.value[name + dateItem]).toBe(value);
            });
        };
        dCtrl.init(searchObj, component.searchForm, expectFunc);
    });

    it('searchObj중에 type이 select, radio, check일때 data가 없으면 false를 return해야한다', () => {
        if (component['searchObjValid']()) {
            expect(component['formIsShow']).toBeFalsy();
        }
    });

    it('searchObj중에 type이 select, radio일때 value값이 data 배열중에 없으면 첫번째 값을 가져야 한다.', () => {
        for (const keys in searchObj) {
            if (isTypes.test(searchObj[keys]['type'])) {
                const value = searchObj[keys]['value'];
                const datas = searchObj[keys]['data'];
                if (value === '' || value === null) {
                    expect(value).toBe(datas[0].value);
                } else {
                    const valueAr = datas.filter(
                        (item: any, idx: number, arr: any[]) => {
                            return item.value === value;
                        }
                    );
                    if (valueAr.length > 0) {
                        expect(value).toBe(valueAr[0].value);
                    } else {
                        expect(value).toBe(datas[0].value);
                    }
                }
            }
        }
    });

    it('searchObj중에 type이 check일때 value값에 따라 각 checkbox 요소는 true이거나 false여야 한다', () => {
        component['initUiCtrl']();
        searchObj.filter(item => item.type === 'check').forEach(cItem => {
            component.matchk
                .filter(matchk_item => matchk_item.name === cItem.name)
                .forEach(matchk_item => {
                    const demiValue: number = parseInt(cItem.value, 10);
                    const targetValue: number = parseInt(matchk_item.value, 10);
                    if ((demiValue & targetValue) !== 0) {
                        expect(matchk_item.checked).toBeTruthy();
                    } else {
                        expect(matchk_item.checked).toBeFalsy();
                    }
                });
        });
    });

    it('초기화 버튼 클릭 시 모든 입력 값이 초기화 되어야 함. select, radio일 경유 첫 번째  옵션이 선택되어야 한다.', () => {
        component['reset'](component.searchForm);
        const valueObj = component.searchForm['_directives'];
        const selRaArr = searchObj.filter(item => isTypes.test(item.type));

        for (const key in valueObj) {
            if (valueObj[key]) {
                const isSelRa = selRaArr.filter(
                    item => valueObj[key].name === item.name
                );

                if (isSelRa.length > 0) {
                    expect(valueObj[key].value).toBe(isSelRa[0].data[0].value);
                } else {
                    expect(valueObj[key].value).toBeFalsy();
                }
            }
        }
    });

    it('검색버튼 클릭 시 부모 이벤트를 호출하는 searchClick.Emit 함수와 setUrlHis 함수가 호출 되어야 한다.', () => {
        const searchClickSpy: jasmine.Spy = spyOn(
                component['searchClick'],
                'emit'
            ),
            setUrlHisSpy: jasmine.Spy = spyOn(
                component['_paramUtils'],
                'setUrlHis'
            );
        component['search'](component.searchForm);
        expect(searchClickSpy).toHaveBeenCalled();
        expect(setUrlHisSpy).toHaveBeenCalled();
    });
});
