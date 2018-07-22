import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { NgForm, ReactiveFormsModule, Validator } from '@angular/forms';
import { Event } from '@angular/router/src/events';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { DateCtrl } from '../../yoService/uiCtrl/DateCtrl';
import { SelRaCtrl } from '../../yoService/uiCtrl/SelRaCtrl';
import { CheckCtrl } from '../../yoService/uiCtrl/CheckCtrl';

@Component({
    selector: 'yo-detail',
    templateUrl: './yo-detail.component.html',
    styleUrls: ['./yo-detail.component.scss']
})
export class YoDetailComponent implements OnInit {
    @Input() private detailObj: DetailObj[];
    @Input() private detailObjData: any;
    @ViewChild('detailForm') detailForm: NgForm;

    private editorConfig: any = {
        spellcheck: true,
        height: '500',
        minHeight: '500',
        width: 'auto',
        imageEndPoint: 'http://localhost:8080/media/',
        placeholder: '내용을 입력하세요...'
    };

    constructor(
        private _dateCtrl: DateCtrl,
        private _selRaCtrl: SelRaCtrl,
        private _checkCtrl: CheckCtrl
    ) {}

    ngOnInit() {
        this.detailObj.forEach(item => {
            item.value = '';
        });
        setTimeout(() => {
            this.setObjValue(this.detailObjData);
            this.setViewCtrlValue();
        }, 0);
    }

    // 부모로 부터 데이터 세팅
    setObjValue(detailObjData: any): void {
        if (!detailObjData) {
            return;
        }
        this.detailObj.forEach((item, index, array) => {
            if (item.id in detailObjData) {
                item.value = detailObjData[item.id];
            }
        });
    }

    setViewCtrlValue(): void {
        setTimeout(() => {
            this._dateCtrl.init(
                this.detailObj,
                this.detailForm,
                this._dateCtrl.setOne
            );
            this._selRaCtrl.init(this.detailObj);
        }, 0);
    }
}

export interface DetailObj {
    name: string;
    id: string;
    type: string;
    value: string;
    required?: boolean;
    disable?: boolean;
    regex?: RegExp;
    data?: DetailData[];
}

export interface DetailData {
    name: string;
    value: string;
}
