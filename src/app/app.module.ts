import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/yoGuard/auth.guard';
import { ParamUtils } from './core/yoService/utils/params/param.service';
import { RegexUtils } from './core/yoService/utils/regex/regex.service';
import { YoaxService } from './core/yoService/db/yoax.service';
import { HttpModule } from '@angular/http';
import { FormatterUtils } from './core/yoService/utils/formatter/formatter.service';
import { FormUtils } from './core/yoService/utils/form/form.service';
import { ProjectModel } from './model/project-model';
import { ConfirmUtils } from './core/yoService/utils/confirm/confirm.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [AppComponent],
    providers: [
        AuthGuard,
        ParamUtils,
        RegexUtils,
        YoaxService,
        FormatterUtils,
        FormUtils,
        ConfirmUtils,
        ProjectModel
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
