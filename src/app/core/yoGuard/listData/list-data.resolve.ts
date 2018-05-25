import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { YoaxService } from '../../yoService/db/yoax.service';

@Injectable()
export class ListDataResolve implements Resolve<any> {
    constructor(private _as: YoaxService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        let param: any;
        if (route.params) {
            param = Object.assign(route.params);
        }
        if (route.queryParams) {
            param = Object.assign(param, route.queryParams);
        }
        console.log(param);

        let url: string = route.routeConfig.path.split('-list')[0];
        url = '/' + url + '/';
        return this._as.yoax(url, 'get', param);
    }
}
