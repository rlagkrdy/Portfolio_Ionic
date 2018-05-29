import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserListModel } from '../../../page/user/model/userModel';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ModelDataResolve implements Resolve<any> {
    private model = new UserListModel();
    constructor() {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        const modelOption = {};

        modelOption['searchObj'] = this.model.getSearchObj(route.params.titles);
        modelOption['columnDefs'] = this.model.getColumDef(route.params.titles);
        modelOption['titles'] =
            route.params.titles === 'usrList'
                ? '회원관리 > 유효회원'
                : '회원관리 > 탈퇴회원';

        return of(modelOption);
    }
}
