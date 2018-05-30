import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid';
import { Router, ActivatedRoute } from '@angular/router';
import { YoaxService } from '../../../core/yoService/db/yoax.service';

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
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
        this._router.navigate(['room-detail/' + params.data.ROOM_KEY]);
    }

    insertUsr(): void {
        this._router.navigate(['room-detail']);
    }

    searchClick(params: any): void {
        this._ys.yoax('/room/', 'get', params).subscribe(result => {
            this.rowData = JSON.parse(result._body);
        });
    }
}
