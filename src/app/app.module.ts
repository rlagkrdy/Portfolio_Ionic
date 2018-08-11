import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './core/yoGuard/auth.guard';
import { ParamUtils } from './core/yoService/utils/params/param.service';
import { RegexUtils } from './core/yoService/utils/regex/regex.service';
import { YoaxService } from './core/yoService/http/yoax.service';
import { FormatterUtils } from './core/yoService/utils/formatter/formatter.service';
import { FormUtils } from './core/yoService/utils/form/form.service';
import { ConfirmUtils } from './core/yoService/utils/confirm/confirm.service';
import { ProjectModel } from './model/project-model';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    ChartsModule
  ],
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
