import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { BaseListCtrl } from '../../../core/yoController/BaseListCtrl';
import { YoaxService } from '../../../core/yoService/http/yoax.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BaseListCtrl implements OnInit {
  isInsert: boolean = false;
  private param: any;
  constructor(
    yoaxService: YoaxService,
    activatedRoute: ActivatedRoute,
    router: Router
  ) {
    super(activatedRoute, yoaxService, router, 'usr');

    this.param =
      router.url.indexOf('Delete') !== -1
        ? { type: 'usrDeleteList', USR_STATE: 2, isInsert: false }
        : { type: 'usrList', USR_STATE: 1, isInsert: true };

    this.isInsert = this.param.isInsert;

    console.log(this.isInsert);

    activatedRoute.queryParams.subscribe(res => {
      this.param = Object.assign(this.param, res);
      this.getData();
    });
  }

  ngOnInit(): void {
    super.setListData();
  }

  getData(): void {
    super.searchClick(this.param);
  }

  searchClick(params: any): void {
    super.searchClick(Object.assign(this.param, params));
  }

  cellClick(params: any): void {
    const queryParam: NavigationExtras = {
      queryParams: { type: this.param.type }
    };
    super.cellClick(params.data.USR_KEY, queryParam);
  }
}
