import { Location } from '@angular/common';

import swal, { SweetAlertType } from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import {
    ConfirmUtils,
    ActionOption
} from '../yoService/utils/confirm/confirm.service';
import { FormUtils } from '../yoService/utils/form/form.service';
import { ProjectModel } from '../../model/project-model';

export class BaseDetailCtrl {
    private title: string = '';

    private detailObj: Array<object>;
    private detailData: any;

    private profileUrl: string;

    private num: number;

    public isInsert: boolean = false;
    public isRestore: boolean = false;

    constructor(
        public activatedRoute: ActivatedRoute,
        private location: Location,
        private confirmUtils: ConfirmUtils,
        private formUtils: FormUtils,
        private projectModel: ProjectModel,
        private url: string
    ) {
        this.detailObj = this.projectModel.getDetailObj(this.url);
    }

    setDetailData(): void {
        this.activatedRoute.data.subscribe(data => {
            console.log(data);
            if (data.DetailResolve) {
                this.detailData = data.DetailResolve;
                this.profileUrl = this.detailData.MEDIA_URL;
            }
            if (data.modelResolve) {
                this.setDefaultData(data.modelResolve);
            }
        });

        this.num = this.activatedRoute.snapshot.params.id;
        this.isInsert = this.num ? false : true;
    }

    setDefaultData(data: any): void {
        for (const key in data) {
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }

    backToList(): void {
        this.location.back();
    }

    confirm(
        type: string,
        formArr: any,
        params: any,
        fileArr?: Array<File>
    ): void {
        const isVaild: boolean = this.formUtils.customFormValid(formArr);
        if (!isVaild) {
            return;
        }

        const actionOption: ActionOption = this.confirmUtils.getActionOption(
            this.url,
            this.num,
            type
        );
        this.confirmUtils
            .confirm(actionOption, params, fileArr)
            .then(result => {
                if (result.value) {
                    this.confirmed(actionOption);
                }
            });
    }

    private confirmed(actionOption: ActionOption): void {
        swal(
            `${actionOption.targetName} ${actionOption.actionName} 하였습니다.`,
            '',
            'success'
        ).then(() => {
            this.backToList();
        });
    }
}
