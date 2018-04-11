import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;
    let router: Router;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule],
                declarations: [LayoutComponent, SidebarComponent, HeaderComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        router = TestBed.get(Router);
    });

    it('should create LayoutComponent include SidebarComponent, HeaderComponent', () => {
        expect(component).toBeTruthy();
    });
});
