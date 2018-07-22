import { async, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmUtils } from '../yoService/utils/confirm/confirm.service';
import { FormUtils } from '../yoService/utils/form/form.service';
import { BaseDetailCtrl } from './BaseDetailCtrl';
import { ProjectModel } from '../../model/project-model';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ParamUtils } from '../yoService/utils/params/param.service';
import { RegexUtils } from '../yoService/utils/regex/regex.service';
import { FormatterUtils } from '../yoService/utils/formatter/formatter.service';
import { NgForm, NgModel } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { YoaxService } from '../yoService/http/yoax.service';

describe('BaseDetailCtrl', () => {
    const mockSnapshotParams = {
        id: 3
    };
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
        data: {
            subscribe: (fn: (value: any) => void) =>
                fn({
                    DetailResolve: mockDetailResolve
                })
        }
    };

    const mockNgModel: Array<any> = [
        {
            errors: null,
            name: 'USR_NAME'
        }
    ];

    let baseDetailCtrl: BaseDetailCtrl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule],
            providers: [
                { provide: ActivatedRoute, useValue: fakeActivatedRoute },
                Location,
                ConfirmUtils,
                FormUtils,
                ProjectModel,
                YoaxService,
                ParamUtils,
                RegexUtils,
                FormatterUtils
            ]
        });

        const activatedRoute = TestBed.get(ActivatedRoute);
        const location = TestBed.get(Location);
        const confirmUtils = TestBed.get(ConfirmUtils);
        const formUtils = TestBed.get(FormUtils);
        const projectModel = TestBed.get(ProjectModel);

        baseDetailCtrl = new BaseDetailCtrl(
            activatedRoute,
            location,
            confirmUtils,
            formUtils,
            projectModel,
            'usr'
        );
    }));

    it('BaseDetailCtrl 정상적으로 생성되어야 한다.', () => {
        expect(baseDetailCtrl).toBeTruthy();
    });

    it('detailObj는 ProjectModel.getDetailObj("usr")와 같아야 한다.', () => {
        expect(baseDetailCtrl['detailObj']).toBe(
            baseDetailCtrl['projectModel'].getDetailObj('usr')
        );
    });
    it('setDetailData() :: detailData는 mockDetailResolve와 같고, num은 activatedRoute.snapshot.params.id와 같아야 한다.', () => {
        baseDetailCtrl.setDetailData();
        expect(baseDetailCtrl['detailData']).toBe(mockDetailResolve);
        expect(baseDetailCtrl['num']).toBe(mockSnapshotParams.id);
    });

    it('backToList() :: location.back()을 호출한다.', () => {
        const backSpy: jasmine.Spy = spyOn(baseDetailCtrl['location'], 'back');
        baseDetailCtrl.backToList();
        expect(backSpy).toHaveBeenCalled();
    });

    it('confirm(type, formArr, params, fileArr?) :: confirmUtils.confirm() 함수가 호출되어야 한다.', () => {
        const confirmSpy: jasmine.Spy = spyOn(
            baseDetailCtrl['confirmUtils'],
            'confirm'
        ).and.returnValue(Promise.resolve({ value: true }));

        baseDetailCtrl.confirm('insert', mockNgModel, {});

        expect(confirmSpy).toHaveBeenCalled();
    });
});
