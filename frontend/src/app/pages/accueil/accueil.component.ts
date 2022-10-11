import { Component, OnInit } from '@angular/core';
import { Publication } from '../../core/models/publications.model';
import { PublicationsService } from '../../services/publications.service';
import { Observable, tap, catchError } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  publications$!: Observable<Publication[]>;
  errorMsg!: string;

  constructor(private publicationsService: PublicationsService) { }

  ngOnInit() {
    this.publications$ = this.publicationsService.publications$
    this.publicationsService.getAllPublications()
    console.log(this.publications$);
    
  }

}
