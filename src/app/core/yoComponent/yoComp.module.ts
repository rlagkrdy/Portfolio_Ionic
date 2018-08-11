import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../ThirdPartModule/material.module';
import { YoGridComponent } from './yo-grid/yo-grid.component';
import { YoSearchComponent } from './yo-search/yo-search.component';
import { YoDetailComponent } from './yo-detail/yo-detail.component';
import { ChangeStateDialogComponent } from './yo-dialoag/change-state/change-state.component';
import { ReservBtnComponent } from './yo-aggrid/reserv-btn/reserv-btn.component';
import { YoProfileComponent } from './yo-profile/yo-profile.component';
import { UiCtrlModule } from '../yoService/uiCtrl/UiCtrl.module';
import { CKEditorModule } from 'ng2-ckeditor';
@NgModule({
  declarations: [
    YoGridComponent,
    YoSearchComponent,
    YoDetailComponent,
    ReservBtnComponent,
    ChangeStateDialogComponent,
    YoProfileComponent
  ],
  entryComponents: [ReservBtnComponent, ChangeStateDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([YoGridComponent]),
    MaterialModule,
    UiCtrlModule,
    CKEditorModule
  ],
  exports: [
    YoGridComponent,
    YoSearchComponent,
    YoDetailComponent,
    YoProfileComponent,
    ReservBtnComponent,
    MaterialModule
  ]
})
export class YoCompModule {}
