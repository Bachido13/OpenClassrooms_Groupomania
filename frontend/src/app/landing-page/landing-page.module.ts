import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { SignupComponent } from './component/landing-page/auth/signup/signup.component';
import { LoginComponent } from './component/landing-page/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';



@NgModule({
  declarations: [
    LandingPageComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'email', message: 'Adresse mail non-valide' },
        { name: 'required', message: 'Ce champs est obligatoire!' },
      ],
    }),
    FormlyBootstrapModule,
  ],
  exports: [
    LandingPageComponent,
    SignupComponent,
    LoginComponent
  ]
})
export class LandingPageModule { }
