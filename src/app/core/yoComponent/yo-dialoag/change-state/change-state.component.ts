import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProjectModel } from '../../../../model/project-model';
import { NgForm } from '@angular/forms';
import { FormatterUtils } from '../../../yoService/utils/formatter/formatter.service';
import { CommonCode } from '../../../../commonCode';

@Component({
    selector: 'change-state-dialog',
    templateUrl: 'change-state.component.html',
    styleUrls: ['./change-state.component.scss']
})
export class ChangeStateDialogComponent {
    @ViewChild('stateForm') stateForm: NgForm;
    stateObj: any;

    constructor(
        public dialogRef: MatDialogRef<ChangeStateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (!this.data.type) {
            console.error('type을 넘겨주셔야 합니다.');
            this.dialogRef.close();
            return;
        }
        this.stateObj = CommonCode.getStateObj(this.data.type);
    }

    do(type: string) {
        const params: any = {};
        if (type === 'close') {
            params.state = false;
        } else {
            params.state = true;
            params.data = this.stateForm.value;
        }
        this.dialogRef.close(params);
    }
}
