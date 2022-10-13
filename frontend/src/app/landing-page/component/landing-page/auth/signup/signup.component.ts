import { Component } from '@angular/core';
import {AbstractControl, FormGroup } from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import { AuthService } from '../../../../../core/services/auth.services';
import { catchError, EMPTY, tap, switchMap, pipe } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  errorMsg!: string;
  showError!: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  form = new FormGroup({});
  model = { email: '', password: '', pseudo: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Votre adresse mail:',
        placeholder: 'Saisir votre email',
        required: true,
      },
      validators: {
        validation: [this.IpValidator],
      },
    },
    {
      key: 'password',
      type: 'input',
      props: {
        type: 'password',
        label: 'Votre mot de passe:',
        placeholder: 'Saisir votre mot de passe',
        required: true,
      }
    },
    {
      key: 'pseudo',
      type: 'input',
      props: {
        label: 'Votre pseudo:',
        placeholder: 'Saisir votre pseudo',
        required: true,
      }
    }
  ];

  onSignUp(user: any) {
    this.authService.createUser(user.email, user.password, user.pseudo).pipe(
      switchMap(() => this.authService.loginUser(user.email, user.password)),
      tap(() => {
        this.router.navigate(['/publication/accueil']);
      }),
      catchError(error => {
        console.log(error);
        
        this.errorMsg = error.message;
        this.showError = error.error.error
        return EMPTY;
      })
    ).subscribe();
  }

  IpValidator(control: AbstractControl): any {
    return null; 
  }
  
}
