import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReservBtnComponent } from './reserv-btn.component';
import { YoCompModule } from '../../yoComp.module';
import { MaterialModule } from '../../../ThirdPartModule/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectModel } from '../../../../model/project-model';
import { FormatterUtils } from '../../../yoService/utils/formatter/formatter.service';
import { ChangeStateDialogComponent } from '../../yo-dialoag/change-state/change-state.component';
import { ParamUtils } from '../../../yoService/utils/params/param.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { YoaxService } from '../../../yoService/http/yoax.service';

let component: ReservBtnComponent;
let fixture: ComponentFixture<ReservBtnComponent>;
const initParams = {
    setValue: param => {
        initParams.data.RESERV_STATE = param;
    },
    data: {
        RESERV_KEY: 2,
        RESERV_STATE: 2
    },
    value: 2
};
describe('ReservBtnComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                YoCompModule,
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientModule
            ],
            providers: [ProjectModel, FormatterUtils, YoaxService, ParamUtils]
        }).compileComponents();
    }));

    beforeEach(done => {
        fixture = TestBed.createComponent(ReservBtnComponent);
        component = fixture.componentInstance;
        setTimeout(() => {
            done();
        }, 0);
        fixture.detectChanges();
    });

    it('ReservBtnComponent가 생성되어야 한다.', () => {
        expect(component).toBeTruthy();
    });

    it('setBtn(_value) ::btn_name은 _value가 1 = 예약대기, 2 = 예약완료, 3 = 예약취소, 4 = 예약거절 이여야 한다.', () => {
        component.setBtn(1);
        expect(component['btn_name']).toBe('예약대기');
        component.setBtn(2);
        expect(component['btn_name']).toBe('예약완료');
        component.setBtn(3);
        expect(component['btn_name']).toBe('예약취소');
        component.setBtn(4);
        expect(component['btn_name']).toBe('예약거절');
    });

    it('setBtn(_value) ::btn_class는 _value가 1 = "", 2 = "primary", 3 = "accent", 4 = "warn" 이여야 한다.', () => {
        component.setBtn(1);
        expect(component['btn_class']).toBe('');
        component.setBtn(2);
        expect(component['btn_class']).toBe('primary');
        component.setBtn(3);
        expect(component['btn_class']).toBe('accent');
        component.setBtn(4);
        expect(component['btn_class']).toBe('warn');
    });

    it('setCell() :: cell의 id = initParams.data.RESERV_KEY, state = initParams.data.RESERV_STATE와 같아야 한다.', () => {
        component['params'] = initParams;
        component.setCell();
        expect(component.cell.id).toBe(initParams.data.RESERV_KEY);
        expect(component.cell.state).toBe(initParams.data.RESERV_STATE);
    });

    it('clicked() :: param으로 ChangeStateDialogComponent, {disableClose: true, data : {type:reserv, value: 1}}를 넘겨줘야 한다.', () => {
        const open: jasmine.Spy = spyOn(component.dialog, 'open');
        component.agInit(initParams);
        component.clicked(component['cell']);

        expect(open).toHaveBeenCalled();
        expect(component['dialog'].open).toHaveBeenCalledWith(
            ChangeStateDialogComponent,
            {
                disableClose: true,
                data: {
                    type: 'reserv',
                    value: component['cell'].state
                }
            }
        );
    });
    it('updateState(_cell, _resilt) :: 예약변경후 state는 _result.data.RESERV_STATE와 같아야 한다.', () => {
        component.agInit(initParams);
        component
            .updateState({ id: 2 }, { data: { RESERV_STATE: 1 } })
            .subscribe(res => {
                swal('', '예약상태 변경완료', 'success').then(() => {
                    component['params'].setValue(1);
                    component.setBtn(1);
                    component.setCell();
                    expect(component['btn_name']).toBe('예약대기');
                    expect(component['btn_class']).toBe('');
                    expect(component['cell'].state).toBe(1);
                });
            });
    });
});
