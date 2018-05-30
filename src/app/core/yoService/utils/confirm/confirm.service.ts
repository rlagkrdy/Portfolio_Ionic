import { Injectable } from '@angular/core';
import { YoaxService } from '../../db/yoax.service';
import { ParamUtils } from '../params/param.service';
import { CommonCode } from '../../../../commonCode';
import swal, { SweetAlertType } from 'sweetalert2';

@Injectable()
export class ConfirmUtils {
    constructor(private _ys: YoaxService, private _pu: ParamUtils) {}

    getActionOption(_url: string, _num: number, _type: string): any {
        const actionOption: any = {
            type: _type,
            targetName: this._pu.koreanWordLastValid(CommonCode.getTitle(_url)),
            actionName: '등록',
            requestType: 'post',
            requestUrl: _url
        };
        if (_type === 'update') {
            actionOption.actionName = '수정';
            actionOption.requestType = 'put';
            actionOption.requestUrl += _num;
        } else if (_type === 'delete') {
            actionOption.actionName = '삭제';
            actionOption.requestType = 'delete';
            actionOption.requestUrl += _num;
        } else if (_type === 'leave') {
            actionOption.actionName = '탈퇴';
            actionOption.requestType = 'put';
            actionOption.requestUrl += _num;
        } else if (_type === 'restore') {
            actionOption.actionName = '복원';
            actionOption.requestType = 'put';
            actionOption.requestUrl += _num;
        }
        return actionOption;
    }

    confirm(actionOption: any, params: any): Promise<any> {
        return swal({
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
        });
    }
}
