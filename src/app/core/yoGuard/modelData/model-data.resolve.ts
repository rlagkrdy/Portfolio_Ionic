import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ProjectModel } from '../../../model/project-model';

@Injectable()
export class ModelDataResolve implements Resolve<any> {
    constructor(private _pm: ProjectModel) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        const path: string = route.routeConfig.path,
            urlPath: string = path.split('-')[0],
            isDetail: RegExp = new RegExp(/detail/);

        const componentOption: any = Object.assign({}, route.queryParams);

        if (!isDetail.test(path)) {
            componentOption['searchObj'] = this._pm.getSearchObj(
                urlPath,
                componentOption.type ? componentOption.type : urlPath
            );
            componentOption['columnDefs'] = this._pm.getColumDef(
                urlPath,
                componentOption.type ? componentOption.type : urlPath
            );
            componentOption['title'] = this._pm.getTitle(
                urlPath,
                componentOption.type ? componentOption.type : urlPath
            );
        } else {
            componentOption['title'] = this._pm.getDetailTitle(urlPath);
            componentOption['detailObj'] = this._pm.getDetailObj(urlPath);
        }

        return of(componentOption);
    }
}
