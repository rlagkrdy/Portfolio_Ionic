import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid';
import { YoaxService } from '../../../core/yoService/db/yoax.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-prod-list',
    templateUrl: './prod-list.component.html',
    styleUrls: ['./prod-list.component.scss']
})
export class ProdListComponent implements OnInit {
    private searchObj: Array<object> = [];
    private columnDefs: (ColDef | ColGroupDef)[] = [];
    public titles: string = '';

    private rowData: Array<any> = [];

    constructor(
        private _ys: YoaxService,
        private _ar: ActivatedRoute,
        private _router: Router
    ) {
        this._ar.data.subscribe(data => {
            this.setDefaultData(data.modelResolve);
            this.rowData = JSON.parse(data.ListResolve._body);
        });
    }

    ngOnInit() {}

    setDefaultData(data: any): void {
        for (const key in data) {
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }

    cellClick(params: any): void {
        this._router.navigate(['prod-detail/' + params.data.PROD_KEY]);
    }

    insertUsr(): void {
        this._router.navigate(['prod-detail']);
    }

    searchClick(params: any): void {
        this._ys.yoax('/prod/', 'get', params).subscribe(result => {
            this.rowData = JSON.parse(result._body);
        });
    }
}
