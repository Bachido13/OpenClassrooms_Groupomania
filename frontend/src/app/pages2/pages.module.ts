import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './components/accueil/accueil.component';
import { PublicationComponent } from './components/single-publication/single-publication.component';
import { FormsPublicationComponent } from './components/forms-publication/forms-publication.component';
import { DetailsPublicationComponent } from './components/details-publication/details-publication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [
    AccueilComponent,
    PublicationComponent,
    FormsPublicationComponent,
    DetailsPublicationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ],
  exports: [
    AccueilComponent,
    PublicationComponent,
    FormsPublicationComponent,
    DetailsPublicationComponent
  ]
})
export class PagesModule { }
