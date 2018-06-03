import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { YoCompModule } from '../yoComp.module';
import { NgForm } from '@angular/forms';
import { YoDetailComponent } from './yo-detail.component';
import { MaterialModule } from '../../ThirdPartModule/material.module';
import { ParamUtils } from '../../yoService/utils/params/param.service';
import { RegexUtils } from '../../yoService/utils/regex/regex.service';
import swal from 'sweetalert2';
import { DateCtrl } from '../../yoService/ctrl/DateCtrl';
import { UserModel } from '../../../model/userModel';
import { FormUtils } from '../../yoService/utils/form/form.service';
import { SelRaCtrl } from '../../yoService/ctrl/SelRaCtrl';

let component: YoDetailComponent;
let fixture: ComponentFixture<YoDetailComponent>;
const usrModel: any = new UserModel();
const usrObj: Array<object> = usrModel.usrDetailObj;
const usrData: object = {
    USR_NAME: '김학요',
    USR_ID: 'RLAGKRDY',
    USR_TEL: '01000000000',
    USR_SNS_WAY: 'GOOGLE'
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
        component.setObjValue();
        setTimeout(() => {
            done();
        }, 0);
        fixture.detectChanges();
    });

    it('YoDetailComponent가 생성되어야 한다.', () => {
        expect(component).toBeTruthy();
    });

    it('customFormValid() :: form value가 없다면 return false 아니면 true', () => {
        const pu: FormUtils = new FormUtils(new RegexUtils(), new ParamUtils());
        const form: Array<any> = component.detailForm['_directives'];
        const result = pu.customFormValid(form);
        expect(result).toBeTruthy();
    });
});
