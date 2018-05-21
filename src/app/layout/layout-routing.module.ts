import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { YoCompModule } from '../core/yoComponent/yoComp.module';
import { BlankPageComponent } from '../page/blank-page/blank-page.component';
import { UserListComponent } from '../page/user/list/user-list.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'blank-page', component: BlankPageComponent },
            { path: 'user-list', component: UserListComponent }
        ]
    }
];

@NgModule({
    declarations: [BlankPageComponent, UserListComponent],
    imports: [RouterModule.forChild(routes), YoCompModule],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
