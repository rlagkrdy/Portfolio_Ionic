import {
    async,
    ComponentFixture,
    TestBed,
    ComponentFixtureAutoDetect,
    fakeAsync,
    tick
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
    NoopAnimationsModule,
    BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import { HttpModule, Http } from '@angular/http';
import { ParamUtils } from '../../core/yoService/utils/params/param.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import { YoaxService } from '../../core/yoService/http/yoax.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                NoopAnimationsModule,
                RouterTestingModule,
                HttpModule,
                HttpClientModule,
                FormsModule
            ],
            providers: [YoaxService, ParamUtils],
            declarations: [LoginComponent]
        }).compileComponents();
    }));

    beforeEach(done => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        setTimeout(() => {
            done();
        }, 0);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('NgForm login으로 부터 COMP_ID와 COMP_PW값을 가지고 와야 한다.', () => {
        expect(component.login.value.COMP_ID).toBe('');
        expect(component.login.value.COMP_PW).toBe('');
    });

    it('COMP_ID와 COMP_PW값은 필수여야 한다.', () => {
        expect(component.login.valid).toBeFalsy();
    });

    it('onLoggedin() :: 함수 호출시 form.valid가 false라면 YoaxSerivce의 yoax를 호출하지 말아야 한다.', () => {
        const yoax: jasmine.Spy = spyOn(component['_ys'], 'yoax');
        component.onLoggedin(component.login);
        expect(yoax).not.toHaveBeenCalled();
    });

    it('onLoggedin() :: 함수 호출시 form.valid가 true라면 YoaxSerivce의 yoax를 호출한다.', () => {
        const yoax: jasmine.Spy = spyOn(
            component['_ys'],
            'yoax'
        ).and.returnValue(of(new Array<any>()));
        component.login.setValue({
            COMP_ID: 'admin',
            COMP_PW: 'admin'
        });
        component.onLoggedin(component.login);
        expect(yoax).toHaveBeenCalled();
    });

    it('로그인 실패시 아이디와 비밀번호를 다시 빈값으로 변경, isFaile는 true여야 한다.', async(done => {
        component.login.setValue({
            COMP_ID: 'admin',
            COMP_PW: 'admin'
        });

        const MockData: Array<any> = [];
        const yoax: jasmine.Spy = spyOn(
            component['_ys'],
            'yoax'
        ).and.returnValue(of(MockData));

        component.onLoggedin(component.login);

        expect(component.login.value.COMP_ID).toBe(null);
        expect(component.login.value.COMP_PW).toBe(null);

        expect(component['isFaile']).toBeTruthy();
    }));

    it('로그인 성공시 SesstionStorige에 저장 및 router로 usr-list로 이동', () => {
        component.login.setValue({
            COMP_ID: 'admin',
            COMP_PW: 'admin'
        });

        const MockData: Array<any> = [1];
        const yoax: jasmine.Spy = spyOn(
            component['_ys'],
            'yoax'
        ).and.returnValue(of(MockData));
        const router: jasmine.Spy = spyOn(component.router, 'navigate');

        component.onLoggedin(component.login);

        expect(router).toHaveBeenCalled();
        expect(localStorage.getItem('isLoggedin')).toBeTruthy();
    });
});
