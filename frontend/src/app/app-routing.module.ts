import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/landing-page/auth/signup/signup.component';
import { LoginComponent } from './pages/landing-page/auth/login/login.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FormsPublicationComponent } from './pages/forms-publication/forms-publication.component';
import { DetailsPublicationComponent } from './pages/details-publication/details-publication.component'
import { AuthGuard } from './services/auth-guard.services';

const routes: Routes = [
  { path: 'inscription', component: SignupComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'groupomania', component: LandingPageComponent },
  { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard] },
  { path: 'publication/:id', component: DetailsPublicationComponent, canActivate: [AuthGuard] },
  { path: 'create', component: FormsPublicationComponent, canActivate: [AuthGuard] },
  { path: 'modify-publication/:id', component: FormsPublicationComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'groupomania'},
  { path: '**', redirectTo: 'groupomania' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
