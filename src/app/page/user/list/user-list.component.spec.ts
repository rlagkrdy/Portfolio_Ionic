import {
    async,
    ComponentFixture,
    TestBed,
    inject
} from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { YoaxService } from '../../../core/yoService/db/yoax.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ListDataResolve } from '../../../core/yoGuard/listData/list-data.resolve';
import { YoCompModule } from '../../../core/yoComponent/yoComp.module';
import { HttpModule } from '@angular/http';
import { ParamUtils } from '../../../core/yoService/utils/params/param.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('Setting UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    const fakeActivatedRoute: any = {
        params: {
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
                        columnDefs: [
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
                        ],
                        isInsert: 'true',
                        searchObj: [
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
                        ],
                        titles: '회원관리 > 유효회원',
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
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [YoCompModule, HttpClientModule, RouterTestingModule],
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
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
        inject(
            [YoaxService, ActivatedRoute, Router],
            (_yoax: YoaxService, _ar: ActivatedRoute, _router: Router) => {
                expect(component).toBeFalsy();
            }
        ));
});
