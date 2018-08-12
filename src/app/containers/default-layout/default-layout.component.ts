import { Component, Input } from '@angular/core';
import { navItems } from '../_nav';
import { YoaxService } from '../../core/yoService/http/yoax.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    styleUrls: ['./default-layout.component.scss'],
    templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
    public navItems = navItems;
    public sidebarMinimized = true;
    private changes: MutationObserver;
    public element: HTMLElement = document.body;

    constructor(private _ys: YoaxService, private router: Router) {
        this.changes = new MutationObserver(mutations => {
            this.sidebarMinimized = document.body.classList.contains(
                'sidebar-minimized'
            );
        });

        this.changes.observe(<Element>this.element, {
            attributes: true
        });
    }

    onLoggedout() {
        this._ys.yoax('/logout', 'get').subscribe(result => {
            localStorage.removeItem('isLoggedin');
            this.router.navigate(['login']);
        });
    }
}
