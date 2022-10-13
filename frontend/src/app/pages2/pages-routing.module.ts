import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccueilComponent } from "./components/accueil/accueil.component";
import { DetailsPublicationComponent } from "./components/details-publication/details-publication.component";
import { FormsPublicationComponent } from "./components/forms-publication/forms-publication.component";
import { AuthGuard } from "../core/services/auth-guard.services";


const routes: Routes = [
    { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard] },
    { path: 'create', component: FormsPublicationComponent, canActivate: [AuthGuard] },
    { path: ':id', component: DetailsPublicationComponent, canActivate: [AuthGuard] },
    { path: 'modify/:id', component: FormsPublicationComponent, canActivate: [AuthGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'accueil'},
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PagesRoutingModule {}