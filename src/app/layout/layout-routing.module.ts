import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { YoCompModule } from '../core/yoComponent/yoComp.module';
import { BlankPageComponent } from '../page/blank-page/blank-page.component';
import { UserListComponent } from '../page/user/list/user-list.component';
import { ListDataResolve } from '../core/yoGuard/listData/list-data.resolve';
import { UserDetailComponent } from '../page/user/detail/user-detail.component';
import { DetailDataResolve } from '../core/yoGuard/detailData/detail-data.resolve';
import { CommonModule } from '@angular/common';
import { ModelDataResolve } from '../core/yoGuard/modelData/model-data.resolve';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'blank-page',
                component: BlankPageComponent,
                resolve: {
                    ListResolve: ListDataResolve,
                    modelResolve: ModelDataResolve
                }
            },
            {
                path: 'usr-list',
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
            }
        ]
    }
];

@NgModule({
    declarations: [BlankPageComponent, UserListComponent, UserDetailComponent],
    providers: [ListDataResolve, DetailDataResolve, ModelDataResolve],
    imports: [CommonModule, RouterModule.forChild(routes), YoCompModule],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
