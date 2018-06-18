import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoProfileComponent } from './yo-profile.component';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core/src/debug/debug_node';

describe('YoProfileComponent', () => {
    let component: YoProfileComponent;
    let fixture: ComponentFixture<YoProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YoProfileComponent],
            imports: [BrowserModule, HttpModule, HttpClientModule],
            providers: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YoProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('imgUrl이라는 기븐 이미지 주소를 가지고 있는 변수가 존재해야 한다.', () => {
        expect(component['imgUrl']).toBeTruthy();
    });

    it('imgUrl의 값은 "assets/images/profile-icon.png"와 같아야 한다', () => {
        expect(component['imgUrl']).toBe('assets/images/profile-icon.png');
    });

    it('input file의 display는 none이여야 한다.', () => {
        const style: String = window
            .getComputedStyle(document.getElementById('profile_file'), null)
            .getPropertyValue('display');
        expect(style).toBe('none');
    });

    it('이미지 클릭시 input file클릭 이벤트가 발생해야 한다.', () => {
        const clickEvent = spyOn(component, 'openFileUpload');
        const clickTarget = spyOn(component, 'openFileUpload');
        const imgEl: DebugElement = fixture.debugElement.query(By.css('.profile-image'));
        imgEl.triggerEventHandler('click', null);
        expect(clickEvent).toHaveBeenCalled();
    });
});
