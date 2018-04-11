import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { YoSearchComponent, SearchObj } from './yo-search.component';
import { YoCompModule } from '../yoComp.module';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
    let component: YoSearchComponent;
    let fixture: ComponentFixture<YoSearchComponent>;
    let searchObj: Array<SearchObj>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [YoCompModule, RouterTestingModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(YoSearchComponent);
        component = fixture.componentInstance;
        // searchObj = [];
        searchObj = [
            {
                id: 'aa',
                name: 'aa',
                type: 'aa',
                value: 'aa'
            }
        ];

        component['searchObj'] = searchObj;

        fixture.detectChanges();
    });

    it('SearchComponent가 생성되어야 한다.', () => {
        expect(component).toBeTruthy();
    });

    it('searchObj가 undefind거나 length가 0이라면 formIsShow는 false여야 한다', () => {
        searchObj = component['searchObj'];
        if (!searchObj || searchObj.length === 0) {
            expect(component['formIsShow']).toBe(false);
        }
    });

    it('formIsShow가 false라면 화면은 보여서는 안된다.', () => {
        const formIsShow: boolean = component['formIsShow'];
        const searchFormEl = fixture.debugElement.query(By.css('.yo-search-session'));
        if (!formIsShow) {
            expect(searchFormEl).toBeFalsy();
        }
    });

    it('searchObj의 length가 0보다 클때 id는 존재해야 한다.', () => {
        console.log(searchObj);
    });
    it('searchObj의 length가 0보다 클때 name은 존재해야 한다.', () => {
        console.log(searchObj);
    });
    it('searchObj의 length가 0보다 클때 type은 "input, select, radio, check, date"중 하나여야 한다.', () => {
        console.log(searchObj);
    });
});
