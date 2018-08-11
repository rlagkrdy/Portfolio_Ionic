import { Component, OnInit } from '@angular/core';
import { ColDef, ColGroupDef } from 'ag-grid';
import { ActivatedRoute, Router } from '@angular/router';
import { YoaxService } from '../../../core/yoService/http/yoax.service';
import { BaseListCtrl } from '../../../core/yoController/BaseListCtrl';

@Component({
  selector: 'app-reserv-list',
  templateUrl: './reserv-list.component.html',
  styleUrls: ['./reserv-list.component.scss']
})
export class ReservListComponent extends BaseListCtrl implements OnInit {
  private param: any;

  constructor(
    yoaxService: YoaxService,
    activatedRoute: ActivatedRoute,
    router: Router
  ) {
    super(activatedRoute, yoaxService, router, 'reserv');

    activatedRoute.queryParams.subscribe(res => {
      this.param = res;
      super.searchClick(this.param);
    });
  }

  ngOnInit() {
    super.setListData();
  }

  cellClick(params: any): void {}
}
