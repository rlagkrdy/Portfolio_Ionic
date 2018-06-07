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
import { YoCtrlModule } from '../yoService/ctrl/yoCtrl.module';
import { ChangeStateDialogComponent } from './yo-dialoag/change-state/change-state.component';
import { ReservBtnComponent } from './yo-aggrid/reserv-btn/reserv-btn.component';
import { YoProfileComponent } from './yo-profile/yo-profile.component';
import { HttpClientModule } from '@angular/common/http';

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
        HttpClientModule,
        YoCtrlModule
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
