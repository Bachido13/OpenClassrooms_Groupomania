import { Component, OnInit } from '@angular/core';
import { Publication } from '../../core/models/publications.model';
import { PublicationsService } from '../../services/publications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { catchError, EMPTY, map, Observable, of, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-details-publication',
  templateUrl: './details-publication.component.html',
  styleUrls: ['./details-publication.component.scss']
})
export class DetailsPublicationComponent implements OnInit {

  loading!: boolean;
  publication$!: Observable<Publication>
  userId!: string;
  liked!: boolean;
  errorMessage!: string;


  constructor(private publicationsService: PublicationsService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.userId = this.auth.getUserId();
    this.publication$ = this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => this.publicationsService.getPublicationById(id)),
      tap(publication => {
        console.log(publication);
        
        this.loading = false;
        if (publication.usersLiked.find(user => user === this.userId)) {
          this.liked = true;
        } 
      })
    );
  }

  onLike() {
    this.publication$.pipe(
      take(1),
      switchMap((publication: Publication) => this.publicationsService.likePublication(publication._id, !this.liked).pipe(
        tap(liked => {
          this.liked = liked;
        }),
        map(liked => ({ ...publication, likes: liked ? publication.likes + 1 : publication.likes - 1})),
        tap(publication => this.publication$ = of(publication))
      )),
    ).subscribe();
  }

  onBack() {
    this.router.navigate(['/accueil']);
  }

  onModify() {
    this.publication$.pipe(
      take(1),
      tap(publication => this.router.navigate(['/modify-publication', publication._id]))
    ).subscribe();
  }

  onDelete() {
    this.loading = true;
    this.publication$.pipe(
      take(1),
      switchMap(publication => this.publicationsService.deletePublication(publication._id)),
      tap(message => {
        console.log(message);
        this.loading = false;
        this.router.navigate(['/accueil']);
      }),
      catchError(error => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error(error);
        return EMPTY;
      })
    ).subscribe();
  }
}
