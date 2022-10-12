import { Component, OnInit, Input } from '@angular/core';
import { Publication } from '../../core/models/publications.model';
import { PublicationsService } from '../../services/publications.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-single-publication',
  templateUrl: './single-publication.component.html',
  styleUrls: ['./single-publication.component.scss']
})
export class PublicationComponent implements OnInit {
  
  @Input() 
  publication!: Publication;
  buttonText!: string;
  publication$!: Observable<Publication>;
  userId!: string;
  userPseudo!: string;
  date!: Date;
  liked!: boolean;
  imagePreview!: string;

  constructor(private publicationsService: PublicationsService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    console.log(this.publication);
    
    this.userPseudo = this.publication.author?.pseudo;
    this.date = this.publication.createdDate;
    this.buttonText = 'Like !';
  }

  onViewPublication(id: string) {
    this.router.navigateByUrl(`publication/${this.publication._id}`)
  }
}