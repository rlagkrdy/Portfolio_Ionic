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
        const param: any = {};
        for (const key in route.params) {
            if (route.params[key]) {
                param[key] = route.params[key];
            }
        }
        for (const key in route.queryParams) {
            if (route.queryParams[key]) {
                param[key] = route.queryParams[key];
            }
        }

        let url: string = route.routeConfig.path.split('-list')[0];
        url = '/' + url + '/';
        return this._as.yoax(url, 'get', param);
    }
}
