import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { YoSearchComponent, SearchObj } from './yo-search.component';
import { YoCompModule } from '../yoComp.module';
import { By } from '@angular/platform-browser';
import { NgForm } from '@angular/forms/src/directives/ng_form';

let component: YoSearchComponent;
let fixture: ComponentFixture<YoSearchComponent>;
let searchObj: Array<SearchObj>;

describe('SearchComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [YoCompModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YoSearchComponent);
        component = fixture.componentInstance;
        // searchObj = [];
        searchObj = [
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
                value: 'eee',
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
                value: 'ccc',
                data: [
                    { name: 'aaa', value: 'aaa' },
                    { name: 'bbb', value: 'bbb' },
                    { name: 'ccc', value: 'ccc' }
                ]
            }
        ];

        component['searchObj'] = searchObj;

        fixture.detectChanges();
    });

    // it('SearchComponent가 생성되어야 한다.', () => {
    //     expect(component).toBeTruthy();
    // });

    // it('searchObj가 undefind거나 length가 0이라면 formIsShow는 false여야 한다', () => {
    //     searchObj = component['searchObj'];
    //     if (!searchObj || searchObj.length === 0) {
    //         expect(component['formIsShow']).toBe(false);
    //     }
    // });

    // it('formIsShow가 false라면 화면은 보여서는 안된다.', () => {
    //     const formIsShow: boolean = component['formIsShow'];
    //     const searchFormEl = fixture.debugElement.query(By.css('.yo-search-session'));
    //     if (!formIsShow) {
    //         expect(searchFormEl).toBeFalsy();
    //     }
    // });

    // it('searchObj의 length가 0보다 클때 id,name는 존재해야하며, type은 "input, select, radio, check, date"중 하나여야 한다.', () => {
    //     searchObj = component['searchObj'];
    //     for (const keys in searchObj) {
    //         if (searchObj[keys]) {
    //             expect(searchObj[keys].id).toBeTruthy();
    //             expect(searchObj[keys].name).toBeTruthy();
    //             expect(searchObj[keys].type).toMatch(/input|select|radio|check|date/g);
    //         }
    //     }
    // });

    // it('searchObj중에 id값이 중복된다면 false를 return 해야한다.', () => {
    //     searchObj = component['searchObj'];
    //     if (!component['searchObjDuplicate']()) {
    //         expect(component['formIsShow']).toBeFalsy();
    //     }
    // });

    // it('searchObj중에 type이 select, radio, check일때 data가 없으면 false를 return해야한다', () => {
    //     searchObj = component['searchObj'];
    //     if (!component['searchObjValid']()) {
    //         expect(component['formIsShow']).toBeFalsy();
    //     }
    // });

    it('searchObj중에 type이 select, radio, check일때 value값이 data 배열중에 없으면 첫번째 값을 가져야 한다.', () => {
        searchObj = component['searchObj'];

        const isTypes: RegExp = new RegExp(/select|radio|check/);
        for (const keys in searchObj) {
            if (isTypes.test(searchObj[keys]['type'])) {
                const value = searchObj[keys]['value'];
                const datas = searchObj[keys]['data'];
                if (value === '' || value === null) {
                    expect(value).toBe(datas[0].value);
                } else {
                    const valueAr = datas.filter((item: any, idx: number, arr: any[]) => {
                        return item.value === value;
                    });
                    if (valueAr.length > 0) {
                        expect(value).toBe(valueAr[0].value);
                    } else {
                        expect(value).toBe(datas[0].value);
                    }
                }
            }
        }
    });
});

// describe('SearchComponent Reset Event', () => {
//     beforeEach(function(done) {
//         setTimeout(() => {
//             component['reset'](component.searchForm);
//             done();
//         }, 0);
//     });
//     it('초기화 버튼 클릭시 모든 입력 값이 초기화 되어야 함.', () => {
//         const valueObj = component.searchForm['_directives'];
//         for (const key in valueObj) {
//             if (valueObj[key]) {
//                 expect(valueObj[key].value).toBeFalsy();
//             }
//         }
//         // view에서 select, radio, checkbox 확인 해야함;
//     });
//     // it('검색버튼 클릭시 ???', () => {
//     //     const searchEl = fixture.debugElement.query(By.css('#search-btn'));
//     //     setTimeout(() => {
//     //         searchEl.triggerEventHandler('click', component.searchForm);
//     //     }, 0);
//     // });
// });
