import { NgModule } from '@angular/core';
import { SelRaCtrl } from './SelRaCtrl';
import { DateCtrl } from './DateCtrl';
import { CheckCtrl } from './CheckCtrl';

@NgModule({
    providers: [CheckCtrl, SelRaCtrl, DateCtrl],
    exports: []
})
export class UiCtrlModule {}
