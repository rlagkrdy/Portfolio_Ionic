import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid/dist/lib/entities/colDef';
import { YoaxService } from '../../../core/yoService/db/yoax.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    private searchObj: Array<object> = [];
    private columnDefs: (ColDef | ColGroupDef)[] = [];
    public titles: string = '';

    private rowData: Array<any> = [];

    private checkBool: RegExp = /true|false/;
    private isInsert: boolean = false;

    private routeParam: any;
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
            this.routeParam = data;
        });
    }

    ngOnInit(): void {}

    setDefaultData(data: any): void {
        for (const key in data) {
            if (this.hasOwnProperty(key)) {
                this[key] = this.checkBool.test(data[key])
                    ? JSON.parse(data[key])
                    : data[key];
            }
        }
    }

    cellClick(params: any): void {
        this._router.navigate([
            'usr-detail/' + params.data.USR_KEY,
            { type: this.routeParam.type }
        ]);
    }

    insertUsr(): void {
        this._router.navigate(['usr-detail']);
    }

    searchClick(params: any): void {
        params = Object.assign(params, this.routeParam);

        this._ys.yoax('/usr/', 'get', params).subscribe(result => {
            this.rowData = JSON.parse(result._body);
        });
    }
}
