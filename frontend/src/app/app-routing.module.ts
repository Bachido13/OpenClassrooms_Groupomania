import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './landing-page/component/landing-page/auth/signup/signup.component';
import { LoginComponent } from './landing-page/component/landing-page/auth/login/login.component';
import { LandingPageComponent } from './landing-page/component/landing-page/landing-page.component';
import { AuthGuard } from './core/services/auth-guard.services';

const routes: Routes = [
  { path: 'inscription', component: SignupComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'groupomania', component: LandingPageComponent },
  { path: 'publication', loadChildren: () => import('./pages2/pages.module').then(m => m.PagesModule) },
  { path: '**', redirectTo: 'groupomania' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
