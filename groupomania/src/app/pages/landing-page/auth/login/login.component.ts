import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.services';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorMsg!: string;
  showError!: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  form = new FormGroup({});
  model = { email: '', password: '' };
  fields: FormlyFieldConfig[] = [
    {  
      fieldGroupClassName: 'formulaire-connexion',
      fieldGroup: [
      {
        className: 'input-email',
        key: 'email',
        type: 'input',
        props: {
          label: 'Votre adresse mail:',
          placeholder: 'Saisir votre email',
          required: true,
        }
      },
      {
        className: 'input-password',
        key: 'password',
        type: 'input',
        props: {
          type: 'password',
          label: 'Votre mot-de-passe:',
          placeholder: 'Saisir votre mot de passe',
          required: true,
        }
      }
      ]
    }
  ];

  onLogin(user: any) {
    this.authService.loginUser(user.email, user.password).pipe(
      tap(() => {
        this.router.navigate(['/accueil']);
      }),
      catchError(error => {
        console.log(error.error.error);

        this.showError = error.error.error;
        
        this.errorMsg = error.message;
        return EMPTY;
      })
    ).subscribe();
  }
}
