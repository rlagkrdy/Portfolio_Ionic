import { Component, OnInit, ViewChild } from '@angular/core';
import { YoDetailComponent } from '../../../core/yoComponent/yo-detail/yo-detail.component';
import {
    ConfirmUtils,
    ActionOption
} from '../../../core/yoService/utils/confirm/confirm.service';
import { ActivatedRoute } from '@angular/router';
import { FormUtils } from '../../../core/yoService/utils/form/form.service';
import { FormatterUtils } from '../../../core/yoService/utils/formatter/formatter.service';
import { ProjectModel } from '../../../model/project-model';
import { Location } from '@angular/common';
import swal, { SweetAlertType } from 'sweetalert2';

@Component({
    selector: 'app-setting-detail',
    templateUrl: './setting-detail.component.html',
    styleUrls: ['./setting-detail.component.scss']
})
export class SettingDetailComponent implements OnInit {
    private roomModel: any;
    private detailObj: Array<object>;
    private detailData: object;

    private isInsert: boolean = false;

    private num: number;
    private url: string;

    @ViewChild(YoDetailComponent) private _ydc: YoDetailComponent;
    constructor(
        private _cu: ConfirmUtils,
        private _ar: ActivatedRoute,
        private _fu: FormUtils,
        private _foru: FormatterUtils,
        private _location: Location,
        private _pm: ProjectModel
    ) {
        this.url = this._ar.snapshot.url[0].path.split('-detail')[0];
        this.detailObj = this._pm.getDetailObj(this.url);
        this.url = '/' + this.url + '/';

        this.num = this._ar.snapshot.params.id;
        this.isInsert = this.num ? false : true;

        this._ar.data.subscribe(data => {
            if (data.DetailResolve) {
                this.detailData = data.DetailResolve;
            }
        });
    }

    ngOnInit() {}

    private detailDo(_type: string): void {
        const actionOption: ActionOption = this._cu.getActionOption(
            this.url,
            this.num,
            _type
        );

        const params: any = this._ydc.detailForm.value;
        let isVaild: boolean = true;

        const formArr: any = this._ydc.detailForm['_directives'];
        isVaild = this._fu.customFormValid(formArr);

        if (!isVaild) {
            return;
        }

        this._cu.confirm(actionOption, params).then(result => {
            if (result.value) {
                swal(
                    `${actionOption.targetName} ${
                        actionOption.actionName
                    } 하였습니다.`,
                    '',
                    'success'
                ).then(() => {});
            }
            if (result.dismiss) {
                console.log('취소 클릭...');
            }
        });
    }
}
