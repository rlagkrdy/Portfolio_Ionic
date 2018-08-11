import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { YoaxService } from '../../../core/yoService/http/yoax.service';
import { BaseListCtrl } from '../../../core/yoController/BaseListCtrl';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent extends BaseListCtrl implements OnInit {
  private param: any;

  constructor(
    yoaxService: YoaxService,
    activatedRoute: ActivatedRoute,
    router: Router
  ) {
    super(activatedRoute, yoaxService, router, 'room');

    activatedRoute.queryParams.subscribe(res => {
      this.param = res;
      super.searchClick(this.param);
    });
  }

  ngOnInit() {
    super.setListData();
  }

  cellClick(params: any): void {
    super.cellClick(params.data.ROOM_KEY);
  }
}
