import {
    async,
    ComponentFixture,
    TestBed,
    inject
} from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { ActivatedRoute, Router } from '@angular/router';

import { ListDataResolve } from '../../../core/yoGuard/listData/list-data.resolve';
import { YoCompModule } from '../../../core/yoComponent/yoComp.module';
import { ParamUtils } from '../../../core/yoService/utils/params/param.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BaseListCtrl } from '../../../core/yoController/BaseListCtrl';
import { ColDef, ColGroupDef } from 'ag-grid';
import { YoaxService } from '../../../core/yoService/http/yoax.service';

describe('Setting UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    const searchObj: Array<object> = [
        {
            id: 'USR_CREATE',
            name: '가입일시',
            type: 'date',
            value: ''
        },
        {
            id: 'USR_SNS_WAY',
            name: 'SNS여부',
            type: 'radio',
            value: '',
            data: [
                { name: '전체', value: '' },
                { name: '네이버', value: 'NAVER' },
                { name: '페이스북', value: 'FACEBOOK' },
                { name: '구글', value: 'GOOGLE' }
            ]
        },
        {
            id: 'KEYWORD',
            name: '키워드',
            type: 'input',
            value: ''
        }
    ];
    const columnDefs: (ColDef | ColGroupDef)[] = [
        {
            headerName: '회원명',
            field: 'USR_NAME',
            width: 100
        },
        {
            headerName: '아이디',
            field: 'USR_ID',
            width: 100
        },
        {
            headerName: '연락처',
            field: 'USR_TEL',
            width: 150
        },
        {
            headerName: 'SNS여부',
            field: 'USR_SNS_WAY',
            width: 100
        },
        {
            headerName: '예약횟수',
            field: 'RESERV_TIME',
            width: 100
        },
        {
            headerName: '가입일시',
            field: 'USR_CREATE_NM',
            width: 100
        }
    ];

    const fakeActivatedRoute: any = {
        queryParams: {
            subscribe: (fn: (value: any) => void) =>
                fn({
                    aaa: 'aaa'
                })
        },
        data: {
            subscribe: (fn: (value: any) => void) =>
                fn({
                    modelResolve: {
                        USR_STATE: '1',
                        columnDefs: columnDefs,
                        isInsert: 'true',
                        searchObj: searchObj,
                        title: '회원관리 > 유효회원',
                        type: 'usrList'
                    },
                    ListResolve: [
                        {
                            USR_CHECK_EMAIL: '0',
                            USR_ID: 'rlagkrdy3',
                            USR_NAME: '김학요3',
                            USR_TEL: '01058703333',
                            USR_FCM: '',
                            USR_KEY: 3,
                            USR_EMAIL: 'qwe333@qq.com',
                            USR_STATE: '1',
                            USR_CREATE_NM: '2018-05-22',
                            USR_SNS_WAY: 'NAVER',
                            USR_CREATE: 1526999633000,
                            RESERV_TIME: 0
                        },
                        {
                            USR_CHECK_EMAIL: '0',
                            USR_ID: 'rlagkrdy2',
                            USR_NAME: '김학요2',
                            USR_TEL: '01058702222',
                            USR_FCM: '',
                            USR_KEY: 2,
                            USR_EMAIL: 'qwe222@qq.com',
                            USR_STATE: '1',
                            USR_CREATE_NM: '2018-05-22',
                            USR_SNS_WAY: 'FACEBOOK',
                            USR_CREATE: 1526999633000,
                            RESERV_TIME: 1
                        },
                        {
                            USR_CHECK_EMAIL: '0',
                            USR_ID: 'rlagkrdy1',
                            USR_NAME: '김학요1',
                            USR_TEL: '01058701111',
                            USR_FCM: '',
                            USR_KEY: 1,
                            USR_EMAIL: 'qwe111@qq.com',
                            USR_STATE: '1',
                            USR_CREATE_NM: '2018-05-22',
                            USR_SNS_WAY: 'GOOGLE',
                            USR_CREATE: 1526999633000,
                            RESERV_TIME: 2
                        }
                    ]
                })
        }
    };
    let superCtrl: BaseListCtrl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [YoCompModule, HttpClientModule],
            declarations: [UserListComponent],
            providers: [
                YoaxService,
                ParamUtils,
                { provide: ActivatedRoute, useValue: fakeActivatedRoute },
                {
                    provide: Router,
                    useClass: class {
                        navigate = jasmine.createSpy('navigate');
                        currentUrlTree = {
                            queryParams: ''
                        };
                    }
                }
            ]
        }).compileComponents();

        const _ar: ActivatedRoute = TestBed.get(ActivatedRoute);
        const _ys: YoaxService = TestBed.get(YoaxService);
        const _router: Router = TestBed.get(Router);
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        superCtrl = component['__proto__']['__proto__'];
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('UserListComponent는 ListCtrl를 상속받아야 한다.', () => {
        expect(component instanceof BaseListCtrl).toBeTruthy();
    });

    it('noOnInit() :: super.setListData가 호출되어야 한다.', () => {
        const setListDataSpy: jasmine.Spy = spyOn(superCtrl, 'setListData');
        component.ngOnInit();
        expect(setListDataSpy).toHaveBeenCalled();
    });

    it('super.setListData() :: 함수가 호출되면 searchObj와 columnDefs는 MockData와 같아야 한다', () => {
        expect(component['searchObj']).toBe(searchObj);
    });

    it('cellClick(param) :: 가 호출 되면 내부에서는 super의 cellClick을 다시 호출한다.', () => {
        const MockParams = {
            data: {
                USR_KEY: '1'
            }
        };
        const superCellClick: jasmine.Spy = spyOn(superCtrl, 'cellClick');

        component.cellClick(MockParams);
        expect(superCellClick).toHaveBeenCalled();
    });
});
