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
import {
    ReservBtnComponent,
    DialogComponent
} from './reserv-btn/reserv-btn.component';

@NgModule({
    declarations: [
        YoGridComponent,
        YoSearchComponent,
        YoDetailComponent,
        ReservBtnComponent,
        DialogComponent
    ],
    entryComponents: [ReservBtnComponent, DialogComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AgGridModule.withComponents([YoGridComponent]),
        MaterialModule,
        YoCtrlModule
    ],
    exports: [
        YoGridComponent,
        YoSearchComponent,
        YoDetailComponent,
        ReservBtnComponent,
        MaterialModule
    ]
})
export class YoCompModule {}
