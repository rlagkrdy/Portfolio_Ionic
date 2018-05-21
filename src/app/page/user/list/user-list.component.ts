import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid/dist/lib/entities/colDef';
import { UserListModel } from '../model/userModel';

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

    constructor() {}

    ngOnInit(): void {}

    cellClick(params: any): void {
        console.log(params);
    }
}
