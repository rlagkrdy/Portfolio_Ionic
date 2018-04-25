import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid/dist/lib/entities/colDef';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
    private searchObj: Array<object>;

    private columnDefs: (ColDef | ColGroupDef)[] = [
        { headerName: 'Make', field: 'make', width: 300 },
        { headerName: 'Model', field: 'model', width: 300 },
        { headerName: 'Price', field: 'price', width: 300 }
    ];

    private rowData: Array<any> = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 },
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 },
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 },
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 },
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 },
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 },
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
    constructor() {
        this.searchObj = [
            {
                id: 'aa',
                name: 'aa',
                type: 'input',
                value: 'aa'
            },
            {
                id: 'bb',
                name: 'bb',
                type: 'date',
                value: '2018-04-20'
            },
            {
                id: 'dd',
                name: 'dd',
                type: 'select',
                value: 'ddd',
                data: [
                    { name: 'aaa', value: 'aaa' },
                    { name: 'bbb', value: 'bbb' },
                    { name: 'ccc', value: 'ccc' }
                ]
            },
            {
                id: 'ee',
                name: 'ee',
                type: 'radio',
                value: 'eee',
                data: [
                    { name: 'aaa', value: 'aaa' },
                    { name: 'bbb', value: 'bbb' },
                    { name: 'ccc', value: 'ccc' }
                ]
            },
            {
                id: 'ff',
                name: 'ff',
                type: 'check',
                value: 'ccc',
                data: [
                    { name: 'aaa', value: 'aaa' },
                    { name: 'bbb', value: 'bbb' },
                    { name: 'ccc', value: 'ccc' }
                ]
            }
        ];
    }

    ngOnInit() {}

    aaa(): void {
        // alert('클릭!!!');
    }

    cellClick(params: any) {
        console.log(params);
    }
}
