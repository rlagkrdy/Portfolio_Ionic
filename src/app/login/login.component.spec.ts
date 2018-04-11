import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
    NoopAnimationsModule,
    BrowserAnimationsModule
} from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [BrowserAnimationsModule, NoopAnimationsModule, RouterTestingModule],
                declarations: [LoginComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
