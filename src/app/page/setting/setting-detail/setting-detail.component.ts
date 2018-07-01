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
import { BaseDetailCtrl } from '../../../core/yoController/BaseDetailCtrl';

@Component({
    selector: 'app-setting-detail',
    templateUrl: './setting-detail.component.html',
    styleUrls: ['./setting-detail.component.scss']
})
export class SettingDetailComponent extends BaseDetailCtrl implements OnInit {
    @ViewChild(YoDetailComponent) private _ydc: YoDetailComponent;

    constructor(
        formUtils: FormUtils,
        activatedRoute: ActivatedRoute,
        location: Location,
        projectModel: ProjectModel,
        confirmUtils: ConfirmUtils
    ) {
        super(
            activatedRoute,
            location,
            confirmUtils,
            formUtils,
            projectModel,
            'def'
        );
    }

    ngOnInit() {
        super.setDetailData();
    }

    private detailDo(_type: string): void {
        const formArr: any = this._ydc.detailForm['_directives'],
            params: object = this._ydc.detailForm.value;
        super.confirm(_type, formArr, params);
    }
}
