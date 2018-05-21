import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlankPageComponent } from './blank-page.component';
import { YoCompModule } from '../../core/yoComponent/yoComp.module';
import { RouterTestingModule } from '@angular/router/testing';
import { YoSearchComponent } from '../../core/yoComponent/yo-search/yo-search.component';

describe('BlankPageComponent', () => {
    let component: BlankPageComponent;
    let fixture: ComponentFixture<BlankPageComponent>;

    let searchComponent: YoSearchComponent, searchFixture: ComponentFixture<YoSearchComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [YoCompModule, RouterTestingModule],
                declarations: [BlankPageComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(BlankPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        searchFixture = TestBed.createComponent(YoSearchComponent);
        searchComponent = searchFixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
