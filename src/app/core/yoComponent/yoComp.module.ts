import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../ThirdPartModule/material.module';
import { YoGridComponent } from './yo-grid/yo-grid.component';
import { YoSearchComponent } from './yo-search/yo-search.component';
import { YoDetailComponent } from './yo-detail/yo-detail.component';
import { ChangeStateDialogComponent } from './yo-dialoag/change-state/change-state.component';
import { ReservBtnComponent } from './yo-aggrid/reserv-btn/reserv-btn.component';
import { YoProfileComponent } from './yo-profile/yo-profile.component';
import { NgxEditorModule } from 'ngx-editor';
import { UiCtrlModule } from '../yoService/uiCtrl/UiCtrl.module';

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
        NgxEditorModule
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
