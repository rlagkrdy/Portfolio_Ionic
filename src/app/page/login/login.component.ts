import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { NgForm } from '@angular/forms';
import { YoaxService } from '../../core/yoService/http/yoax.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    @ViewChild('login') login: NgForm;
    private isFaile: Boolean = false;

    constructor(public router: Router, private _ys: YoaxService) {}

    ngOnInit() {}

    onLoggedin(form: NgForm) {
        if (!form.valid) {
            return;
        }
        this._ys.yoax('/comp/', 'get', form.value).subscribe(result => {
            console.log(result);
            if (result.length === 0) {
                this.login.reset();
                this.isFaile = true;
            } else {
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(['/usr-list'], {
                    queryParams: {
                        type: 'usrList',
                        USR_STATE: 1,
                        isInsert: true
                    }
                });
            }
        });
    }
}
