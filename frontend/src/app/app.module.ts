import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr'

// LIBRAIRIES
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

//MODULES
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//COMPONENTS
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/landing-page/auth/signup/signup.component';
import { LoginComponent } from './pages/landing-page/auth/login/login.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { HeaderComponent } from './pages/header/header.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FormsPublicationComponent } from './pages/forms-publication/forms-publication.component';
import { PublicationComponent } from './pages/single-publication/single-publication.component';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { DetailsPublicationComponent } from './pages/details-publication/details-publication.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AccueilComponent,
    HeaderComponent,
    LandingPageComponent,
    FormsPublicationComponent,
    PublicationComponent,
    DetailsPublicationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'email', message: 'Adresse mail non-valide' },
        { name: 'required', message: 'Ce champs est obligatoire!' },
      ],
    }),
    FormlyBootstrapModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }
