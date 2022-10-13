import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthInterceptor } from "./interceptors/auth-interceptor";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import { HeaderComponent } from "./components/header/header.component";
import * as fr from '@angular/common/locales/fr'

registerLocaleData(localeFr)

@NgModule({
   declarations: [
        HeaderComponent
   ], 
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'fr-FR'},
        AuthInterceptor
    ]
})

export class CoreModule {
    constructor() {
      registerLocaleData(fr.default);
    }
}