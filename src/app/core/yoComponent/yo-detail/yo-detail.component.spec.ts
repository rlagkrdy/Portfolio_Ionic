import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { YoCompModule } from '../yoComp.module';
import { NgForm } from '@angular/forms';
import { UserDetailModel } from '../../../page/user/model/userModel';
import { YoDetailComponent } from './yo-detail.component';
import { MaterialModule } from '../../ThirdPartModule/material.module';
import { ParamUtils } from '../../yoService/utils/params/param.service';
import { RegexUtils } from '../../yoService/utils/regex/regex.service';
import swal from 'sweetalert2';

let component: YoDetailComponent;
let fixture: ComponentFixture<YoDetailComponent>;
const usrModel: any = new UserDetailModel();
const usrObj: Array<object> = usrModel.usrObj;
const usrData: object = {
    USR_NAME: '김학요',
    USR_ID: 'RLAGKRDY',
    USR_TEL: '01000000000',
    USR_SNS_WAY: 0
};

describe('YoDetailComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [YoCompModule, RouterTestingModule, MaterialModule]
        }).compileComponents();
    }));

    beforeEach(done => {
        fixture = TestBed.createComponent(YoDetailComponent);
        component = fixture.componentInstance;
        component['detailObj'] = usrObj;
        component['detailObjData'] = usrData;
        setTimeout(() => {
            done();
        }, 0);
        fixture.detectChanges();
    });

    it('YoDetailComponent가 생성되어야 한다.', () => {
        expect(component).toBeTruthy();
    });

    it('customFormValid() :: form directives에 errors가 있다면 return false 아니면 true', () => {
        const form: Array<any> = component.detailForm['_directives'];
        const pu: ParamUtils = new ParamUtils(new RegexUtils());
        const result = pu.customFormValid(form);

        expect(result).toBeFalsy();
    });
});
