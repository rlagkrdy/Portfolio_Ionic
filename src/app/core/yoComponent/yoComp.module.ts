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

@NgModule({
    declarations: [YoGridComponent, YoSearchComponent, YoDetailComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AgGridModule.withComponents([YoGridComponent]),
        MaterialModule
    ],
    exports: [YoGridComponent, YoSearchComponent, YoDetailComponent]
})
export class YoCompModule {}
