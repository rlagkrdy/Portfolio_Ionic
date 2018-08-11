import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/list/user-list.component';
import { ListDataResolve } from '../core/yoGuard/listData/list-data.resolve';
import { ModelDataResolve } from '../core/yoGuard/modelData/model-data.resolve';
import { DetailDataResolve } from '../core/yoGuard/detailData/detail-data.resolve';
import { UserDetailComponent } from './user/detail/user-detail.component';
import { RoomListComponent } from './room/list/room-list.component';
import { RoomDetailComponent } from './room/detail/room-detail.component';
import { ProdListComponent } from './prod/list/prod-list.component';
import { ProdDetailComponent } from './prod/detail/prod-detail.component';
import { ReservListComponent } from './reserv/list/reserv-list.component';
import { SettingDetailComponent } from './setting/setting-detail/setting-detail.component';
import { YoCompModule } from '../core/yoComponent/yoComp.module';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from '../containers';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'charts',
        loadChildren: './chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'usr-list',
        data: {
          title: '유효회원'
        },
        component: UserListComponent,
        resolve: {
          modelResolve: ModelDataResolve
        }
      },
      {
        path: 'usrDelete-list',
        data: {
          title: '탈퇴회원'
        },
        component: UserListComponent,
        resolve: {
          modelResolve: ModelDataResolve
        }
      },
      {
        path: 'usr-detail/:id',
        data: {
          title: '회원상세'
        },
        component: UserDetailComponent,
        resolve: {
          DetailResolve: DetailDataResolve,
          modelResolve: ModelDataResolve
        }
      },
      {
        path: 'usr-detail',
        data: {
          title: '회원상세'
        },
        component: UserDetailComponent,
        resolve: {
          modelResolve: ModelDataResolve
        }
      },
      {
        path: 'room-list',
        data: {
          title: '스터디룸 관리'
        },
        component: RoomListComponent,
        resolve: {
          modelResolve: ModelDataResolve
        }
      },
      {
        path: 'room-detail/:id',
        data: {
          title: '스터디룸 상세'
        },
        component: RoomDetailComponent,
        resolve: {
          DetailResolve: DetailDataResolve,
          modelResolve: ModelDataResolve
        }
      },
      {
        path: 'room-detail',
        data: {
          title: '스터디룸 관리'
        },
        component: RoomDetailComponent,
        resolve: {
          modelResolve: ModelDataResolve
        }
      },
      {
        path: 'prod-list',
        data: {
          title: '상품 관리'
        },
        component: ProdListComponent,
        resolve: {
          modelResolve: ModelDataResolve
        }
      },
      {
        path: 'prod-detail/:id',
        data: {
          title: '상품 상세'
        },
        component: ProdDetailComponent,
        resolve: {
          DetailResolve: DetailDataResolve,
          modelResolve: ModelDataResolve
        }
      },
      {
        path: 'prod-detail',
        data: {
          title: '상품 상세'
        },
        component: ProdDetailComponent,
        resolve: {
          modelResolve: ModelDataResolve
        }
      },
      {
        path: 'reserv-list',
        data: {
          title: '예약 관리'
        },
        component: ReservListComponent,
        resolve: {
          modelResolve: ModelDataResolve
        }
      },
      {
        path: 'def-detail/:id',
        data: {
          title: '설정'
        },
        component: SettingDetailComponent,
        resolve: {
          DetailResolve: DetailDataResolve,
          modelResolve: ModelDataResolve
        }
      }
    ]
  }
];

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    RoomListComponent,
    RoomDetailComponent,
    ProdListComponent,
    ProdDetailComponent,
    ReservListComponent,
    SettingDetailComponent
  ],
  providers: [ListDataResolve, DetailDataResolve, ModelDataResolve],
  imports: [CommonModule, RouterModule.forChild(routes), YoCompModule],
  exports: [RouterModule]
})
export class ViewsRoutingModule {}
