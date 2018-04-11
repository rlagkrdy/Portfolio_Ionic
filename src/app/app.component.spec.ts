import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app-routing.module';
import { APP_BASE_HREF, Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { NgModuleFactoryLoader } from '@angular/core';
import { LoginModule } from './login/login.module';
import { NotFoundModule } from './not-found/not-found.module';

declare var module;

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    let router: Router;
    let location: Location;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [AppRoutingModule, RouterTestingModule.withRoutes(routes)],
                declarations: [AppComponent]
            }).compileComponents();
        })
    );
    // AppRoutingModule를 Import안시켜 주면 router-outlet태그에러 발생
    // router를 추가 해주었는데 경로가 안 잡혀 있으면 경로를 알수 없기 때문에
    // 기본 경로 추가

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        location = TestBed.get(Location);
        router = TestBed.get(Router);

        const loader = TestBed.get(NgModuleFactoryLoader);
        loader.stubbedModules = {
            LayoutModule: LayoutModule,
            LoginModule: LoginModule,
            NotFoundModule: NotFoundModule
        };

        router.resetConfig([
            { path: '', loadChildren: 'LayoutModule' },
            { path: 'login', loadChildren: 'LoginModule' },
            { path: 'not-found', loadChildren: 'NotFoundModule' }
        ]);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(
        'navigate to "/", it should be "/"',
        fakeAsync(() => {
            router.navigate(['']).then(() => {
                tick();
                expect(location.path()).toBe('/');
            });
        })
    );

    it(
        'navigate to "/login", it should be "/login"',
        fakeAsync(() => {
            router.navigate(['login']).then(() => {
                expect(location.path()).toBe('/login');
            });
        })
    );
    it(
        'navigate to "/login", it should be "/login"',
        fakeAsync(() => {
            router.navigate(['login']).then(() => {
                expect(location.path()).toBe('/login');
            });
        })
    );

    it(
        'navigate to "/not-found", it should be "/not-found"',
        fakeAsync(() => {
            router.navigate(['not-found']).then(() => {
                expect(location.path()).toBe('/not-found');
            });
        })
    );
});
