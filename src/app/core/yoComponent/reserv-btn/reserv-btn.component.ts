import { Component, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-reserv-btn',
    template: `<button mat-raised-button class="mainCta btn-color" (click)="clicked($event)">등록</button>`
})
export class ReservBtnComponent implements ICellRendererAngularComp {
    private params: any;
    public cell: any;

    constructor(private dialog: MatDialog) {}

    agInit(params: any): void {
        console.log(params);
        this.params = params;
        this.cell = { row: params.value, col: params.colDef.headerName };
    }

    clicked(cell: any): void {
        console.log('Child Cell Clicked: ' + JSON.stringify(cell));
        this.dialog.open(DialogComponent, {
            data: {
                animal: 'panda'
            }
        });
    }

    refresh(): boolean {
        return false;
    }
}

@Component({
    selector: 'dialog-example-dialog',
    templateUrl: 'dialog-example-dialog.html'
})
export class DialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(data);
    }
}
