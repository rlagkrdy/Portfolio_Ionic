import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
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
      componentOption['searchObj'] = this._pm.getSearchObj(urlPath, urlPath);
      componentOption['columnDefs'] = this._pm.getColumDef(urlPath, urlPath);
    } else {
      componentOption['detailObj'] = this._pm.getDetailObj(urlPath);
    }

    return of(componentOption);
  }
}
