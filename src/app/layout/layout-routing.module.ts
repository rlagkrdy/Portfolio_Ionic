import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { YoCompModule } from '../core/yoComponent/yoComp.module';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [{ path: 'blank-page', component: BlankPageComponent }]
    }
];

@NgModule({
    declarations: [BlankPageComponent],
    imports: [RouterModule.forChild(routes), YoCompModule],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
