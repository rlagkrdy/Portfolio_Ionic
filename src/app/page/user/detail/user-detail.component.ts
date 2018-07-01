import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { YoDetailComponent } from '../../../core/yoComponent/yo-detail/yo-detail.component';
import { FormUtils } from '../../../core/yoService/utils/form/form.service';
import { UserModel } from '../../../model/userModel';
import {
    ConfirmUtils,
    ActionOption
} from '../../../core/yoService/utils/confirm/confirm.service';
import { ProjectModel } from '../../../model/project-model';
import { YoProfileComponent } from '../../../core/yoComponent/yo-profile/yo-profile.component';
import { BaseDetailCtrl } from '../../../core/yoController/BaseDetailCtrl';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends BaseDetailCtrl implements OnInit {
    @ViewChild(YoDetailComponent) _ydc: YoDetailComponent;
    @ViewChild(YoProfileComponent) private _ypc: YoProfileComponent;

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
            'usr'
        );

        this.activatedRoute.queryParams.subscribe(result => {
            if (result.type === 'usrDeleteList') {
                this.isRestore = true;
            }
        });
    }

    ngOnInit() {
        super.setDetailData();
    }

    public detailDo(_type: string): void {
        const formArr: any = this._ydc.detailForm['_directives'],
            fileArr: Array<File> = this._ypc.profileFile.nativeElement.files;

        let params: object = this._ydc.detailForm.value;
        params = this.setParam(params, _type);

        super.confirm(_type, formArr, params, fileArr);
    }

    public setParam(_params: object, type: string): object {
        if (type === 'restore') {
            _params = {
                USR_STATE: 1
            };
        } else if (type === 'leave') {
            _params = {
                USR_STATE: 2,
                USR_DELETE_DATE: 'NOW'
            };
        }
        return _params;
    }
}
