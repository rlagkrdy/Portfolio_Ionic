import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { YoaxService } from '../../yoService/http/yoax.service';

@Injectable()
export class DetailDataResolve implements Resolve<any> {
  constructor(private _as: YoaxService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let url: string = route.routeConfig.path.split('-detail/:id')[0];
    url = '/' + url + '/' + route.params.id;
    return this._as.yoax(url, 'get', route.queryParams);
  }
}
