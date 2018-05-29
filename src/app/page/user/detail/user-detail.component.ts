import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserDetailModel } from '../model/userModel';
import { YoDetailComponent } from '../../../core/yoComponent/yo-detail/yo-detail.component';
import swal, { SweetAlertType } from 'sweetalert2';
import { YoaxService } from '../../../core/yoService/db/yoax.service';
import { ParamUtils } from '../../../core/yoService/utils/params/param.service';
import { CommonCode } from '../../../commonCode';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    private usrModel: any = new UserDetailModel();
    private usrObj: Array<object> = this.usrModel.usrObj;
    private usrData: object;
    private isInsert: boolean = false;

    @ViewChild(YoDetailComponent) private _ydc: YoDetailComponent;

    private name: string;
    private num: number;
    private url: string;

    constructor(
        private _ys: YoaxService,
        private _pu: ParamUtils,
        private _ar: ActivatedRoute,
        private _location: Location
    ) {
        this.url = this._ar.snapshot.url[0].path.split('-detail')[0];
        this.name = this._pu.koreanWordLastValid(CommonCode.getTitle(this.url));
        this.url = '/' + this.url + '/';

        this.num = this._ar.snapshot.params.id;
        this.isInsert = this.num ? false : true;

        this._ar.data.subscribe(data => {
            if (data.DetailResolve) {
                const rowData = JSON.parse(data.DetailResolve._body);
                this.usrData = rowData;
            }
        });
    }

    ngOnInit() {}

    private backToList(): void {
        this._location.back();
    }

    private getActionOption(_type: string): any {
        const actionOption: any = {
            type: _type,
            targetName: this.name,
            actionName: '등록',
            requestType: 'post',
            requestUrl: this.url
        };
        if (_type === 'update') {
            actionOption.actionName = '수정';
            actionOption.requestType = 'put';
            actionOption.requestUrl += this.num;
        } else if (_type === 'delete') {
            actionOption.actionName = '삭제';
            actionOption.requestType = 'delete';
            actionOption.requestUrl += this.num;
        } else if (_type === 'leave') {
            actionOption.actionName = '탈퇴';
            actionOption.requestType = 'put';
            actionOption.requestUrl += this.num;
        } else if (_type === 'restore') {
            actionOption.actionName = '복원';
            actionOption.requestType = 'put';
            actionOption.requestUrl += this.num;
        }
        return actionOption;
    }

    private detailDo(_type: string): void {
        const actionOption: any = this.getActionOption(_type);
        let params: object = this._ydc.detailForm.value;
        let isVaild: boolean = true;

        if (actionOption.type === 'insert' || actionOption.type === 'update') {
            const formArr: any = this._ydc.detailForm['_directives'];
            isVaild = this._pu.customFormValid(formArr);
        }
        if (!isVaild) {
            return;
        }
        if (actionOption.type === 'restore') {
            params = {
                USR_STATE: 2,
                USR_DELETE_DATE: 'NOW'
            };
        }
        if (actionOption.type === 'leave') {
            params = {
                USR_STATE: 1
            };
        }

        this.confirm(actionOption, params);
    }

    private confirm(actionOption: any, params: any): void {
        console.log('actionOption', actionOption);
        console.log('params', params);
        swal({
            title: `${actionOption.targetName} ${
                actionOption.actionName
            } 하시겠습니까?`,
            text: '',
            type: 'question',
            showCancelButton: true,
            cancelButtonText: '취소',
            showConfirmButton: true,
            confirmButtonText: `${actionOption.actionName}`,
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                this._ys
                    .yoax(
                        actionOption.requestUrl,
                        actionOption.requestType,
                        params
                    )
                    .subscribe(result => {
                        return result;
                    });
            }
        }).then(result => {
            console.log(result);
            if (result.value) {
                swal(
                    `${actionOption.targetName} ${
                        actionOption.actionName
                    } 하였습니다.`,
                    '',
                    'success'
                ).then(() => {
                    this.backToList();
                });
            }
            if (result.dismiss) {
                console.log('취소 클릭...');
            }
        });
    }
}
