import { Injectable } from '@angular/core';
import { UserModel } from './userModel';
import { ColDef, ColGroupDef } from 'ag-grid';
import { RoomModel } from './roomModel';
import { FormatterUtils } from '../core/yoService/utils/formatter/formatter.service';
import { ProdModel } from './prodModel';
import { ReservModel } from './reservModel';
import { DefModel } from './defModel';

@Injectable()
export class ProjectModel {
    constructor(private _fu: FormatterUtils) {}
    private usrModel = new UserModel();
    private roomModel = new RoomModel(this._fu);
    private prodModel = new ProdModel(this._fu);
    private reservModel = new ReservModel();
    private defModel = new DefModel();

    getSearchObj(_objName: string, _type: string): Array<any> {
        return this[_objName + 'Model'][_type + 'Obj'];
    }

    getColumDef(_objName: string, _type: string): (ColDef | ColGroupDef)[] {
        return this[_objName + 'Model'][_type + 'Defs'];
    }

    getTitle(_objName: string, _type: string): string {
        return this[_objName + 'Model'][_type + 'Title'];
    }

    getDetailObj(_objName: string) {
        return this[_objName + 'Model'][_objName + 'DetailObj'];
    }

    getStateObj(_objName: string) {
        return this[_objName + 'Model'][_objName + 'StateObj'];
    }
}
