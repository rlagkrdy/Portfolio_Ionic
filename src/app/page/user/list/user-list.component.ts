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
    private searchObj: Array<object> = this.model.searchObj;
    private columnDefs: (ColDef | ColGroupDef)[] = this.model.columnDefs;

    private rowData: Array<any> = [];

    constructor(
        private _ys: YoaxService,
        private _ar: ActivatedRoute,
        private _router: Router
    ) {
        this._ar.data.subscribe(data => {
            this.rowData = JSON.parse(data.ListResolve._body);
        });
    }

    ngOnInit(): void {}

    cellClick(params: any): void {
        console.log(params);
        this._router.navigate(['usr-detail/' + params.data.USR_KEY]);
    }

    searchClick(params: any): void {
        this._ys.yoax('/usr/', 'get', params).subscribe(result => {
            this.rowData = JSON.parse(result._body);
        });
    }
}
