import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './views/user/list/user-list.component';
import { ListDataResolve } from './core/yoGuard/listData/list-data.resolve';
import { ModelDataResolve } from './core/yoGuard/modelData/model-data.resolve';
import { DetailDataResolve } from './core/yoGuard/detailData/detail-data.resolve';
import { UserDetailComponent } from './views/user/detail/user-detail.component';
import { RoomListComponent } from './views/room/list/room-list.component';
import { RoomDetailComponent } from './views/room/detail/room-detail.component';
import { ProdListComponent } from './views/prod/list/prod-list.component';
import { ProdDetailComponent } from './views/prod/detail/prod-detail.component';
import { ReservListComponent } from './views/reserv/list/reserv-list.component';
import { SettingDetailComponent } from './views/setting/setting-detail/setting-detail.component';
import { YoCompModule } from './core/yoComponent/yoComp.module';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './core/yoGuard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './views/views.module#ViewsModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: './views/login/login.module#LoginModule' },
  {
    path: 'not-found',
    loadChildren: './views/not-found/not-found.module#NotFoundModule'
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
