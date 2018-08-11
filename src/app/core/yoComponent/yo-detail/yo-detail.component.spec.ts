import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { YoCompModule } from '../yoComp.module';
import { NgForm } from '@angular/forms';
import { YoDetailComponent, DetailObj } from './yo-detail.component';
import { MaterialModule } from '../../ThirdPartModule/material.module';
import { ParamUtils } from '../../yoService/utils/params/param.service';
import { RegexUtils } from '../../yoService/utils/regex/regex.service';
import swal from 'sweetalert2';
import { FormUtils } from '../../yoService/utils/form/form.service';
import { DateCtrl } from '../../yoService/uiCtrl/DateCtrl';
import { SelRaCtrl } from '../../yoService/uiCtrl/SelRaCtrl';
import { UserModel } from '../../../model/data/userModel';

let component: YoDetailComponent;
let fixture: ComponentFixture<YoDetailComponent>;
const usrModel: any = new UserModel();
const usrObj: DetailObj[] = usrModel.usrDetailObj;
const usrData: object = {
  USR_NAME: '김학요',
  USR_ID: 'RLAGKRDY',
  USR_TEL: '01000000000',
  USR_SNS_WAY: 'GOOGLE',
  USR_CREATE_NM: '2018-06-22'
};

describe('YoDetailComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [YoCompModule, RouterTestingModule, MaterialModule],
      providers: [DateCtrl, SelRaCtrl]
    }).compileComponents();
  }));

  beforeEach(done => {
    fixture = TestBed.createComponent(YoDetailComponent);
    component = fixture.componentInstance;
    component['detailObj'] = usrObj;
    component['detailObjData'] = usrData;
    component.setObjValue(usrData);
    setTimeout(() => {
      done();
    }, 0);
    fixture.detectChanges();
  });

  it('YoDetailComponent가 생성되어야 한다.', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() :: detailObj의 value를 ""로 최기화 한다', () => {
    component['detailObj'].forEach(item => {
      expect(item.value).toBe('');
    });
  });

  it('setObjValue() :: 부모로 부터 받은 데이터의 값을 세팅하고, setViewCtrlValue()를 호출한다.', () => {
    const viewCtrl: jasmine.Spy = spyOn(component, 'setViewCtrlValue');
    component.setObjValue(usrData);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component['detailObj'].forEach(item => {
        if (item.id in usrData) {
          expect(item.value).toBe(usrData[item.id]);
        }
      });
      expect(viewCtrl).toHaveBeenCalled();
    });
  });

  it('FormUtils.customFormValid() :: form value가 없다면 return false', () => {
    const pu: FormUtils = new FormUtils(new RegexUtils(), new ParamUtils());
    const form: Array<any> = component.detailForm['_directives'];
    const result = pu.customFormValid(form);
    expect(result).toBeFalsy();
  });

  it('FormUtils.customFormValid() :: form value가 있가면 return true', () => {
    const pu: FormUtils = new FormUtils(new RegexUtils(), new ParamUtils());
    const form: Array<any> = component.detailForm['_directives'];

    component.setObjValue(usrData);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const result = pu.customFormValid(form);
      expect(result).toBeTruthy();
    });
  });
});
