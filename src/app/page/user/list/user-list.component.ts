import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid/dist/lib/entities/colDef';
import { UserListModel } from '../model/userModel';
import { YoaxService } from '../../../core/yoService/db/yoax.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    private model: UserListModel = new UserListModel();
    private searchObj: Array<object> = [];
    private columnDefs: (ColDef | ColGroupDef)[] = [];
    public titles: string = '';

    private rowData: Array<any> = [];

    private checkBool: RegExp = /true|false/;
    private isInsert: boolean = false;

    private subParam: any;
    constructor(
        private _ys: YoaxService,
        private _ar: ActivatedRoute,
        private _router: Router
    ) {
        this._ar.data.subscribe(data => {
            this.setDefaultData(data.modelResolve);

            this.rowData = JSON.parse(data.ListResolve._body);
        });
        this._ar.params.subscribe(data => {
            this.subParam = data;
            for (const key in data) {
                if (this.hasOwnProperty(key)) {
                    this[key] = this.checkBool.test(data[key])
                        ? JSON.parse(data[key])
                        : data[key];
                }
            }
        });
    }

    ngOnInit(): void {}

    setDefaultData(data: any): void {
        for (const key in data) {
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }

    cellClick(params: any): void {
        this._router.navigate(['usr-detail/' + params.data.USR_KEY]);
    }

    insertUsr(): void {
        this._router.navigate(['usr-detail']);
    }

    searchClick(params: any): void {
        for (const key in this.subParam) {
            if (this.subParam[key]) {
                params[key] = this.subParam[key];
            }
        }
        this._ys.yoax('/usr/', 'get', params).subscribe(result => {
            this.rowData = JSON.parse(result._body);
        });
    }
}
