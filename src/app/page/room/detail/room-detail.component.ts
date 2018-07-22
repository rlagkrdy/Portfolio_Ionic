import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomModel } from '../../../model/data/roomModel';
import { YoDetailComponent } from '../../../core/yoComponent/yo-detail/yo-detail.component';
import {
    ConfirmUtils,
    ActionOption
} from '../../../core/yoService/utils/confirm/confirm.service';
import { ActivatedRoute } from '@angular/router';
import { FormUtils } from '../../../core/yoService/utils/form/form.service';
import { Location } from '@angular/common';
import swal, { SweetAlertType } from 'sweetalert2';
import { FormatterUtils } from '../../../core/yoService/utils/formatter/formatter.service';
import { ProjectModel } from '../../../model/project-model';
import { BaseDetailCtrl } from '../../../core/yoController/BaseDetailCtrl';

@Component({
    selector: 'app-room-detail',
    templateUrl: './room-detail.component.html',
    styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent extends BaseDetailCtrl implements OnInit {
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
            'room'
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
