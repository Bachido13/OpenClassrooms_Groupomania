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
  
  @Input() publication!: Publication;
  buttonText!: string;
  loading!: boolean;
  publication$!: Observable<Publication>;
  userId!: string;
  liked!: boolean;
  imagePreview!: string;

  constructor(private publicationsService: PublicationsService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.buttonText = 'Like !';
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.publication$ = this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => this.publicationsService.getPublicationById(id)),
      tap(publication => {
        this.loading = false;
        if (publication.usersLiked.find(user => user === this.userId)) {
          this.liked = true;
        }
      })
    )
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

  onViewPublication(id: string) {
    console.log(this.publication);
    
    this.router.navigateByUrl(`publication/${this.publication._id}`)
  }
}