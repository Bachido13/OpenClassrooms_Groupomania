import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Publication } from '../../core/models/publications.model';
import { PublicationsService } from '../../services/publications.service';
import { AuthService } from 'src/app/services/auth.services';


@Component({
  selector: 'app-forms-publication',
  templateUrl: './forms-publication.component.html',
  styleUrls: ['./forms-publication.component.scss']
})
export class FormsPublicationComponent implements OnInit {

  publicationForm!: FormGroup;
  publication!: Publication;
  imagePreview!: string;
  image!: File;
  errorMsg!: string;
  mode!: string;
  formInstanciated = false;


  constructor(private formBuilder: FormBuilder,
              private publicationsService: PublicationsService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        if (!params['id']) {
          this.mode = 'new';
          this.initEmptyForm();
          return EMPTY;
        } else {
          this.mode = 'edit';
          return this.publicationsService.getPublicationById(params['id'])
        }
      }),
      tap(publication => {
        if (publication) {
          this.publication = publication;
          this.initModifyForm(publication);
        }
      }),
      catchError(error => this.errorMsg = JSON.stringify(error))
    ).subscribe();
  }

  initEmptyForm() {
    this.publicationForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      image: [null],
    })
    this.formInstanciated = true;
  }

  initModifyForm(publication: Publication) {
    this.publicationForm = this.formBuilder.group({
      title: [publication.title, Validators.required],
      description: [publication.description, Validators.required],
      image: [null],
      imageUrl: [publication.imageUrl]
    });
    this.formInstanciated = true;
  }

  onSubmitForm() {
    const newPublication = new Publication();
    newPublication.title = this.publicationForm.get('title')!.value;
    newPublication.description = this.publicationForm.get('description')!.value;
    if (this.mode === 'new') {
      this.publicationsService.createPublication(newPublication, this.publicationForm.get('image')!.value).pipe(
        tap(({ message }) => {
          console.log(message);
          this.router.navigate(['/accueil']);
        }),
        catchError(error => {
          console.error(error);
          this.errorMsg = error.message;
          return EMPTY;
        })
      ).subscribe();
    } else if (this.mode === 'edit') {
      this.publicationsService.modifyPublication(this.publication._id, newPublication, this.publicationForm.get('image')!.value).pipe(
        tap(({ message }) => {
          console.log(message);
          this.router.navigate(['/accueil']);
        }),
        catchError(error => {
          console.error(error);
          this.errorMsg = error.message;
          return EMPTY;
        })
      ).subscribe();
    }
  }

  onFileAdded(e_: any) {
    const file = e_.target.files[0];
    this.publicationForm.get('image')?.setValue(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', (e: any) => {
      this.imagePreview = e.target.result;
    })

  }

}
