import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { YoCompModule } from '../core/yoComponent/yoComp.module';
import { UserListComponent } from '../page/user/list/user-list.component';
import { ListDataResolve } from '../core/yoGuard/listData/list-data.resolve';
import { UserDetailComponent } from '../page/user/detail/user-detail.component';
import { DetailDataResolve } from '../core/yoGuard/detailData/detail-data.resolve';
import { CommonModule } from '@angular/common';
import { ModelDataResolve } from '../core/yoGuard/modelData/model-data.resolve';
import { SettingDetailComponent } from '../page/setting/setting-detail/setting-detail.component';
import { RoomListComponent } from '../page/room/list/room-list.component';
import { RoomDetailComponent } from '../page/room/detail/room-detail.component';
import { ProdListComponent } from '../page/prod/list/prod-list.component';
import { ProdDetailComponent } from '../page/prod/detail/prod-detail.component';
import { ReservListComponent } from '../page/reserv/list/reserv-list.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'usr-list',
                component: UserListComponent,
                resolve: {
                    ListResolve: ListDataResolve,
                    modelResolve: ModelDataResolve
                }
            },
            {
                path: 'usr-list-delete',
                component: UserListComponent,
                resolve: {
                    ListResolve: ListDataResolve,
                    modelResolve: ModelDataResolve
                }
            },
            {
                path: 'usr-detail/:id',
                component: UserDetailComponent,
                resolve: { DetailResolve: DetailDataResolve }
            },
            {
                path: 'usr-detail',
                component: UserDetailComponent
            },
            {
                path: 'room-list',
                component: RoomListComponent,
                resolve: {
                    ListResolve: ListDataResolve,
                    modelResolve: ModelDataResolve
                }
            },
            {
                path: 'room-detail/:id',
                component: RoomDetailComponent,
                resolve: { DetailResolve: DetailDataResolve }
            },
            {
                path: 'room-detail',
                component: RoomDetailComponent
            },
            {
                path: 'prod-list',
                component: ProdListComponent,
                resolve: {
                    ListResolve: ListDataResolve,
                    modelResolve: ModelDataResolve
                }
            },
            {
                path: 'prod-detail/:id',
                component: ProdDetailComponent,
                resolve: { DetailResolve: DetailDataResolve }
            },
            {
                path: 'prod-detail',
                component: ProdDetailComponent
            },
            {
                path: 'reserv-list',
                component: ReservListComponent,
                resolve: {
                    ListResolve: ListDataResolve,
                    modelResolve: ModelDataResolve
                }
            },
            {
                path: 'def-detail/:id',
                component: SettingDetailComponent,
                resolve: { DetailResolve: DetailDataResolve }
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
export class LayoutRoutingModule {}
