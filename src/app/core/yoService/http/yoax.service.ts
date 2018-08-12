import { Injectable } from '@angular/core';
import { Response, Request, Headers } from '@angular/http';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { Observable } from 'rxjs';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { resetFakeAsyncZone } from '@angular/core/testing';
import swal from 'sweetalert2';
import { ParamUtils } from '../utils/params/param.service';
import {
    HttpClient,
    HttpEventType,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent
} from '@angular/common/http';
import { CommonCode } from '../../../commonCode';

@Injectable()
export class YoaxService {
    private URI: string = CommonCode.URL;
    private putContentType: string = 'application/json; charset=utf-8';
    private otherContentType: string =
        'application/x-www-form-urlencoded;charset=UTF-8';
    private isPostPut: RegExp = /post|put/;

    private uploadState: string;
    constructor(private _httpClient: HttpClient, private _param: ParamUtils) {}

    public yoax(_url: string, _type: string, _param?: object): Observable<any> {
        if (!this.typeIsCorrect(_type) || !_url) {
            return;
        }
        const url = this.URI + _url;

        let option: RequestOptionsArgs = {};
        option = this.setReqParam(option, _type, _param);
        option.headers = this.setReqContentType(_type);

        const observe: Observable<Response> = this.isPostPut.test(_type)
            ? this._httpClient[_type](url, _param, option)
            : this._httpClient[_type](url, option);

        return observe;
    }

    public fileYoax(
        _url: string,
        files: Array<File>,
        _params?: any
    ): Observable<any> {
        const fd: FormData = new FormData();

        Array.prototype.forEach.call(files, item =>
            fd.append('img', item, item.name)
        );

        return this._httpClient.post(this.URI + _url, fd, {
            reportProgress: true,
            observe: 'events',
            params: _params
        });
    }

    checkUploadState(
        event:
            | HttpSentEvent
            | HttpHeaderResponse
            | HttpProgressEvent
            | HttpResponse<Object>
            | HttpUserEvent<Object>
    ): HttpResponse<Object> {
        if (event.type === HttpEventType.UploadProgress) {
            console.log(
                '업로드 이벤트',
                Math.round((event.loaded / event.total) * 100) + '%'
            );
        } else if (event.type === HttpEventType.Response) {
            console.log('Response 이벤트', event);
            return event;
        }
    }

    // Request Method Type Valid
    typeIsCorrect(_type: string): boolean {
        const isType: RegExp = /get|post|put|delete/;
        return isType.test(_type);
    }

    // ContentType Setting
    setReqContentType(_type: string): Headers {
        const headersObj = new Headers(),
            contentHeader =
                _type === 'put' ? this.putContentType : this.otherContentType;
        headersObj.append('Content-Type', contentHeader);
        return headersObj;
    }

    // Parameter Setting
    setReqParam(
        option: RequestOptionsArgs,
        _type: string,
        _param?: any
    ): RequestOptionsArgs {
        if (_param) {
            const param = Object.assign({}, _param);
            if (param.KEYWORD) {
                param.KEYWORD = decodeURI(param.KEYWORD);
            }
            option.params = param;
            option.body = param;
        }
        return option;
    }

    // Handle Error
    handleError(error: Response): Observable<Response> {
        console.log('서버 에러 발생!');
        return null;
    }
}
