import { async, TestBed } from '@angular/core/testing';
import { BaseListCtrl } from './BaseListCtrl';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ParamUtils } from '../yoService/utils/params/param.service';
import { of } from 'rxjs';
import { YoaxService } from '../yoService/http/yoax.service';

describe('ListCtrl Test', () => {
  let listCtrl: BaseListCtrl;
  const modelResolve = {
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
    title: '회원관리 > 유효회원',
    type: 'usrList'
  };
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
          modelResolve: modelResolve,
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
      imports: [RouterModule, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        YoaxService,
        ParamUtils,
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
    });

    const _ar: ActivatedRoute = TestBed.get(ActivatedRoute);
    const _ys: YoaxService = TestBed.get(YoaxService);
    const _router: Router = TestBed.get(Router);
    listCtrl = new BaseListCtrl(_ar, _ys, _router, 'usr');
  }));

  it('ListCtrl 정상 생성', () => {
    expect(listCtrl).toBeTruthy();
  });

  it('setListData() :: setDefaultData가 호출, rowData, routeParam 이 undefiend가 아니여야 한다.', () => {
    const setDefaultData: jasmine.Spy = spyOn(listCtrl, 'setDefaultData');
    listCtrl.setListData();
    expect(setDefaultData).toHaveBeenCalled();
    expect(listCtrl['rowData'].length).toBeGreaterThan(0);
    expect(listCtrl['routeParam']).not.toBeUndefined();
  });

  it('setDefaultData(data) :: data가 정상적으로 세팅 되어야 한다.', () => {
    listCtrl.setDefaultData(modelResolve);
    console.log(listCtrl);
    expect(listCtrl['title']).toBe(modelResolve.title);
  });

  it('seachClick(param) :: yoaxSerivce에서 yoax함수가 실행되어야 하며, return 값은 rowData와 같아야 한다.', () => {
    const emptyMockParam: any = {};
    const observableValue: Array<any> = [{ aaa: 'bbb' }];
    const yoaxSpy: jasmine.Spy = spyOn(
      listCtrl['yoaxService'],
      'yoax'
    ).and.returnValue(of(observableValue));
    listCtrl.searchClick(emptyMockParam);
    expect(yoaxSpy).toHaveBeenCalled();
    expect(listCtrl['rowData']).toBe(observableValue);
  });

  it('cellClick(params, queryParam?) :: router의 navigate가 실행되어야 한다', () => {
    const mockParam: any = {
      data: {
        USR_KEY: 3
      }
    };
    listCtrl.cellClick(mockParam);
    expect(listCtrl['router'].navigate).toHaveBeenCalled();
  });
});
