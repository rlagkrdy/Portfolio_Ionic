import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid/dist/lib/entities/colDef';
import { YoaxService } from '../../../core/yoService/db/yoax.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { BaseListCtrl } from '../../../core/yoController/BaseListCtrl';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BaseListCtrl implements OnInit {
    private searchObj: Array<object> = [];
    private columnDefs: (ColDef | ColGroupDef)[] = [];

    private isInsert: boolean = false;

    constructor(
        yoaxService: YoaxService,
        activatedRoute: ActivatedRoute,
        router: Router
    ) {
        super(activatedRoute, yoaxService, router, 'usr');
    }

    ngOnInit(): void {
        super.setListData();
    }

    cellClick(params: any): void {
        const queryParam: NavigationExtras = {
            queryParams: { type: this.routeParam.type }
        };
        super.cellClick(params, queryParam);
    }
}
