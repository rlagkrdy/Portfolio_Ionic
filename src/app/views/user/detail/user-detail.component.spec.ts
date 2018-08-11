import { UserDetailComponent } from './user-detail.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { YoCompModule } from '../../../core/yoComponent/yoComp.module';
import { FormUtils } from '../../../core/yoService/utils/form/form.service';
import { ProjectModel } from '../../../model/project-model';
import { ConfirmUtils } from '../../../core/yoService/utils/confirm/confirm.service';
import { RegexUtils } from '../../../core/yoService/utils/regex/regex.service';
import { ParamUtils } from '../../../core/yoService/utils/params/param.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FormatterUtils } from '../../../core/yoService/utils/formatter/formatter.service';
import { HttpClientModule } from '@angular/common/http';
import { BaseDetailCtrl } from '../../../core/yoController/BaseDetailCtrl';
import { YoaxService } from '../../../core/yoService/http/yoax.service';

describe('Setting UserDetailComponent', () => {
    let component: UserDetailComponent;
    let fixture: ComponentFixture<UserDetailComponent>;
    let baseDetailCtrl: BaseDetailCtrl;
    const mockSnapshotParams = {
        id: 3
    };
    const type: string = 'usrDeleteList';
    const mockDetailResolve = {
        RESERV_TIME: 0,
        USR_CHECK_EMAIL: '0',
        USR_CREATE: 1526999633000,
        USR_CREATE_NM: '2018-05-22',
        USR_DELETE_DATE: 1530419119000,
        USR_DELETE_DATE_NM: '2018-07-01',
        USR_EMAIL: 'qwe333@qq.com',
        USR_FCM: '',
        USR_ID: 'rlagkrdy3',
        USR_KEY: 3,
        USR_NAME: '김학요3',
        USR_SNS_WAY: 'FACEBOOK',
        USR_STATE: '1',
        USR_TEL: '01058703333'
    };

    const fakeActivatedRoute = {
        snapshot: {
            params: mockSnapshotParams
        },
        queryParams: {
            subscribe: (fn: (value: any) => void) =>
                fn({
                    type: type
                })
        },
        data: {
            subscribe: (fn: (value: any) => void) =>
                fn({
                    DetailResolve: mockDetailResolve
                })
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserDetailComponent],
            imports: [YoCompModule, RouterTestingModule, HttpClientModule],
            providers: [
                FormUtils,
                RegexUtils,
                ParamUtils,
                ProjectModel,
                FormatterUtils,
                YoaxService,
                ConfirmUtils,
                {
                    provide: ActivatedRoute,
                    useValue: fakeActivatedRoute
                },
                Location
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailComponent);
        component = fixture.componentInstance;
        baseDetailCtrl = component['__proto__']['__proto__'];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('UserDetailComponent는 BaseDetailCtrl를 상속 받아야 한다.', () => {
        expect(component instanceof BaseDetailCtrl).toBeTruthy();
    });

    it('ngOnInit() :: 함수가 실행되면 super.setDetailData()함수가 실행되어야 한다.', () => {
        const setDetailDataSpy: jasmine.Spy = spyOn(
            baseDetailCtrl,
            'setDetailData'
        );
        component.ngOnInit();
        expect(setDetailDataSpy).toHaveBeenCalled();
    });

    it('type이 usrDeleteList와 같으면 isRestore은 true여야 한다.', () => {
        if (type === 'usrDeleteList') {
            expect(component.isRestore).toBeTruthy();
        }
    });

    it('detailDo(type) :: setParam()과 super.confirm() 함수가 호출되어야 한다.', () => {
        const setParamSpy: jasmine.Spy = spyOn(component, 'setParam');
        const confirmSpy: jasmine.Spy = spyOn(baseDetailCtrl, 'confirm');
        component.detailDo('insert');
        expect(setParamSpy).toHaveBeenCalled();
        expect(confirmSpy).toHaveBeenCalled();
    });
});
