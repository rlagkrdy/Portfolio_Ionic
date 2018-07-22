import { Component, Inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import swal from 'sweetalert2';
import { ChangeStateDialogComponent } from '../../yo-dialoag/change-state/change-state.component';
import { CommonCode } from '../../../../commonCode';
import { Observable } from 'rxjs/Observable';
import { YoaxService } from '../../../yoService/http/yoax.service';

@Component({
    selector: 'app-reserv-btn',
    template: `<button mat-raised-button [color]="btn_class" (click)="clicked(cell)">{{btn_name}}</button>`,
    styleUrls: ['./reserv-btn.component.scss']
})
export class ReservBtnComponent implements ICellRendererAngularComp {
    private params: any;
    private btn_name: string;
    private btn_class: string;
    private btn_class_arr: Array<string> = ['', 'primary', 'accent', 'warn'];
    public cell: any;

    constructor(public dialog: MatDialog, private _ys: YoaxService) {}

    agInit(params: any): void {
        this.params = params;
        this.setBtn(this.params.data.RESERV_STATE);
        this.setCell();
    }

    setBtn(_value: any): void {
        this.btn_name = CommonCode.getCode('reserv').filter(item => {
            return item.value === _value.toString();
        })[0].name;
        this.btn_class = this.btn_class_arr[parseInt(_value, 10) - 1];
    }

    setCell(): void {
        this.cell = {
            id: this.params.data.RESERV_KEY,
            state: this.params.data.RESERV_STATE
        };
    }

    clicked(cell: any): void {
        const dialogRef = this.dialog.open(ChangeStateDialogComponent, {
            disableClose: true,
            data: {
                type: 'reserv',
                value: cell.state
            }
        });

        if (dialogRef) {
            dialogRef.afterClosed().subscribe((result: any) => {
                if (result && result.data) {
                    this.updateState(cell, result).subscribe(res => {
                        swal('', '예약상태 변경완료', 'success').then(() => {
                            this.params.setValue(result.data.RESERV_STATE);
                            this.setBtn(result.data.RESERV_STATE);
                            this.setCell();
                        });
                    });
                }
            });
        }
    }

    refresh(): boolean {
        return true;
    }

    updateState(_cell: any, _result: any): Observable<any> {
        return this._ys.yoax('/reserv/' + _cell.id, 'put', _result.data);
    }
}
