import { Component, OnInit, ViewChild } from '@angular/core';
import { YoDetailComponent } from '../../../core/yoComponent/yo-detail/yo-detail.component';
import {
    ConfirmUtils,
    ActionOption
} from '../../../core/yoService/utils/confirm/confirm.service';
import { ActivatedRoute } from '@angular/router';
import { FormUtils } from '../../../core/yoService/utils/form/form.service';
import { FormatterUtils } from '../../../core/yoService/utils/formatter/formatter.service';
import { Location } from '@angular/common';
import { RoomModel } from '../../../model/data/roomModel';
import swal, { SweetAlertType } from 'sweetalert2';
import { ProjectModel } from '../../../model/project-model';
import { BaseDetailCtrl } from '../../../core/yoController/BaseDetailCtrl';

@Component({
    selector: 'app-prod-detail',
    templateUrl: './prod-detail.component.html',
    styleUrls: ['./prod-detail.component.scss']
})
export class ProdDetailComponent extends BaseDetailCtrl implements OnInit {
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
            'prod'
        );
    }

    ngOnInit() {
        super.setDetailData();
    }

    private detailDo(_type: string): void {
        const formArr: any = this._ydc.detailForm['_directives'],
            params: any = this._ydc.detailForm.value;

        if (_type === 'insert') {
            params.COMP_KEY = 2;
        }

        super.confirm(_type, formArr, params);
    }
}
