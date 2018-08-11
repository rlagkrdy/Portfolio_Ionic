import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangeStateDialogComponent } from './change-state.component';
import { YoCompModule } from '../../yoComp.module';
import { MaterialModule } from '../../../ThirdPartModule/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProjectModel } from '../../../../model/project-model';
import { FormatterUtils } from '../../../yoService/utils/formatter/formatter.service';
import { of } from 'rxjs';

let component: ChangeStateDialogComponent;
let fixture: ComponentFixture<ChangeStateDialogComponent>;

describe('ChangeStateDialogComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [YoCompModule, MaterialModule],
      providers: [
        ProjectModel,
        FormatterUtils,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            type: 'reserv',
            value: 1
          }
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: (result: any) => {
              return of(result);
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(done => {
    fixture = TestBed.createComponent(ChangeStateDialogComponent);
    component = fixture.componentInstance;
    setTimeout(() => {
      done();
    }, 0);
    fixture.detectChanges();
  });

  it('ChangeStateDialogComponent가 생성되어야 한다.', () => {
    expect(component).toBeTruthy();
  });

  it('MAT_DIALOG_DATA에서 type을 받아온다', () => {
    expect(component.data.type).toBeTruthy();
  });

  it('type에 맞는 모델 객체를 가지고 온다. project-model 참조', () => {
    expect(component['stateObj']).toBeTruthy();
  });

  it('type이 reserv이면 stateObj의 id는 "RESERV_STATE"이여야 한다', () => {
    if (component.data.type === 'reserv') {
      expect(component['stateObj'].id).toBe('RESERV_STATE');
    }
  });

  it('type이 reserv이면 stateObj의 title은 "예약상태변경"이여야 한다', () => {
    if (component.data.type === 'reserv') {
      expect(component['stateObj'].title).toBe('예약상태변경');
    }
  });

  it('type이 reserv이면 stateObj의 states가 있어야 하며, 배열이여야한다.', () => {
    if (component.data.type === 'reserv') {
      expect(component['stateObj'].states).toBeTruthy();
      expect(component['stateObj'].states).toEqual(jasmine.any(Array));
    }
  });

  it('MAT_DIALOG_DATA에서 value를 받아오고, 그 값으로 세팅 되어야 한다.', () => {
    expect(component.data.value).toBeTruthy();
    expect(component.stateForm.value.RESERV_STATE).toBe(component.data.value);
  });

  it('닫기 버튼을 클릭하면 this.dialogRef.close()이벤트를 발생 시키고, state false를 리턴한다', () => {
    const close: jasmine.Spy = spyOn(component.dialogRef, 'close');
    component.do('close');
    expect(close).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalledWith({
      state: false
    });
  });

  it('수정 버튼을 클릭하면 this.dialogRef.close(param)이벤트를 발생 시키고, state true와 data에 form value를 담아 return 한다', () => {
    const update: jasmine.Spy = spyOn(component.dialogRef, 'close');
    component.do('update');
    expect(update).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalledWith({
      state: true,
      data: component.stateForm.value
    });
  });
});
