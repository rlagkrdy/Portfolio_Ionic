import { Injectable } from '@angular/core';
import { ParamUtils } from '../params/param.service';
import { CommonCode } from '../../../../commonCode';
import swal, { SweetAlertType } from 'sweetalert2';
import { YoaxService } from '../../http/yoax.service';

@Injectable()
export class ConfirmUtils {
    private typeReg: RegExp = /insert|update|delete|leave|restore/;
    constructor(private _ys: YoaxService, private _pu: ParamUtils) {}

    getActionOption(_url: string, _num: number, _type: string): ActionOption {
        if (!this.typeReg.test(_type)) {
            console.error(
                'type은 insert|update|delete|leave|restore중 하나여야 합니다.'
            );
            return null;
        }
        const actionOption: ActionOption = {
            type: _type,
            targetName: this._pu.koreanWordLastValid(CommonCode.getTitle(_url)),
            actionName: '등록',
            requestType: 'post',
            requestUrl: '/' + _url + '/'
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
        } else if (_type === 'update_image') {
            actionOption.actionName = '수정';
            actionOption.requestType = 'post';
            actionOption.requestUrl += 'images/' + _num;
        } else if (_type === 'insert_image') {
            actionOption.actionName = '등록';
            actionOption.requestType = 'post';
            actionOption.requestUrl += 'images';
        }
        return actionOption;
    }

    confirm(
        actionOption: ActionOption,
        params: any,
        files?: Array<File>
    ): Promise<any> {
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
                if (
                    actionOption.type === 'update_image' ||
                    actionOption.type === 'insert_image'
                ) {
                    this._ys
                        .fileYoax(actionOption.requestUrl, files, params)
                        .subscribe(this._ys.checkUploadState);
                } else {
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
            }
        });
    }
}

export interface ActionOption {
    type: string;
    targetName: string;
    actionName: string;
    requestType: string;
    requestUrl: string;
}
