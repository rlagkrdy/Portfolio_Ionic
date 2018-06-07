import { Injectable } from '@angular/core';
import { Http, Response, Request, Headers } from '@angular/http';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { Observable } from 'rxjs/Observable';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { resetFakeAsyncZone } from '@angular/core/testing';
import swal from 'sweetalert2';
import { ParamUtils } from '../utils/params/param.service';

@Injectable()
export class YoaxService {
    private URI: string = 'http://localhost:8080';
    private putContentType: string = 'application/json; charset=utf-8';
    private otherContentType: string = 'application/x-www-form-urlencoded;charset=UTF-8';
    private isPostPut: RegExp = /post|put/;

    constructor(private _http: Http, private _param: ParamUtils) {}

    public yoax(_url: string, _type: string, _param?: object): Observable<any> {
        if (!this.typeIsCorrect(_type) || !_url) {
            return;
        }
        const url = this.URI + _url;

        let option: RequestOptionsArgs = {};
        option = this.setReqParam(option, _type, _param);
        option.headers = this.setReqContentType(_type);

        const returnPromise = this.isPostPut.test(_type)
            ? this._http[_type](url, _param, option)
            : this._http[_type](url, option);

        return returnPromise;
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
