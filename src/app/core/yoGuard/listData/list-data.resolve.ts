import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { YoaxService } from '../../yoService/db/yoax.service';
import { ParamUtils } from '../../yoService/utils/params/param.service';

@Injectable()
export class ListDataResolve implements Resolve<any> {
    constructor(private _as: YoaxService, private _paramUtils: ParamUtils) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        let param: any = {};
        param = Object.assign(param, route.queryParams);

        let url: string = route.routeConfig.path.split('-list')[0];
        url = '/' + url + '/';
        return this._as.yoax(url, 'get', param);
    }
}
