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
import swal, { SweetAlertType } from 'sweetalert2';
import { ProjectModel } from '../../../model/project-model';
import { YoProfileComponent } from '../../../core/yoComponent/yo-profile/yo-profile.component';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    private detailObj: Array<object>;
    private detailData: any;

    private isInsert: boolean = false;
    private isRestore: boolean = false;

    @ViewChild(YoDetailComponent) private _ydc: YoDetailComponent;
    @ViewChild(YoProfileComponent) private _ypc: YoProfileComponent;

    private num: number;
    private url: string;

    constructor(
        private _cu: ConfirmUtils,
        private _ar: ActivatedRoute,
        private _fu: FormUtils,
        private _location: Location,
        private _pm: ProjectModel
    ) {
        this.url = this._ar.snapshot.url[0].path.split('-detail')[0];
        this.detailObj = this._pm.getDetailObj(this.url);
        this.url = '/' + this.url + '/';

        this.num = this._ar.snapshot.params.id;
        this.isInsert = this.num ? false : true;

        this._ar.params.subscribe(result => {
            if (result.type === 'usrDeleteList') {
                this.isRestore = true;
            }
        });

        this._ar.data.subscribe(data => {
            if (data.DetailResolve) {
                this.detailData = data.DetailResolve;
            }
        });
    }

    ngOnInit() {}

    private backToList(): void {
        this._location.back();
    }

    private detailDo(_type: string): void {
        const formArr: any = this._ydc.detailForm['_directives'],
            isVaild: boolean = this._fu.customFormValid(formArr);

        if (!isVaild) {
            return;
        }

        const actionOption: ActionOption = this._cu.getActionOption(
            this.url,
            this.num,
            _type
        );

        let params: object = this._ydc.detailForm.value;
        params = this.setParam(params, actionOption.type);

        const fileArr: Array<File> = this._ypc.profileFile.nativeElement.files;

        this._cu.confirm(actionOption, params, fileArr).then(result => {
            if (result.value) {
                this.confirmed(actionOption);
            }
        });
    }

    private setParam(_params: object, type: string): object {
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

    private confirmed(actionOption: ActionOption): void {
        swal(
            `${actionOption.targetName} ${actionOption.actionName} 하였습니다.`,
            '',
            'success'
        ).then(() => {
            // this.backToList();
        });
    }
}
