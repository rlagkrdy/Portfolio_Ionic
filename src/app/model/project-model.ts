import { Injectable } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid';
import { FormatterUtils } from '../core/yoService/utils/formatter/formatter.service';
import { DetailObj } from '../core/yoComponent/yo-detail/yo-detail.component';
import { SearchObj } from '../core/yoComponent/yo-search/yo-search.component';
import { UserDeleteModel } from './data/userDeleteModel';
import { UserModel } from './data/userModel';
import { RoomModel } from './data/roomModel';
import { ProdModel } from './data/prodModel';
import { ReservModel } from './data/reservModel';
import { DefModel } from './data/defModel';

@Injectable()
export class ProjectModel {
  constructor(private _fu: FormatterUtils) {}
  private usrModel = new UserModel();
  private usrDeleteModel = new UserDeleteModel();
  private roomModel = new RoomModel(this._fu);
  private prodModel = new ProdModel(this._fu);
  private reservModel = new ReservModel();
  private defModel = new DefModel();

  getSearchObj(_objName: string, _type: string): SearchObj[] {
    return this[_objName + 'Model'][_type + 'Obj'];
  }

  getColumDef(_objName: string, _type: string): (ColDef | ColGroupDef)[] {
    return this[_objName + 'Model'][_type + 'Defs'];
  }

  getDetailObj(_objName: string): DetailObj[] {
    return this[_objName + 'Model'][_objName + 'DetailObj'];
  }

  getDetailTitle(_objName: string): DetailObj[] {
    return this[_objName + 'Model'][_objName + 'DetailTitle'];
  }

  getStateObj(_objName: string) {
    return this[_objName + 'Model'][_objName + 'StateObj'];
  }
}
