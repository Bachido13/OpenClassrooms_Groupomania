import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
        private router: Router) { }

    isAuth$ = new BehaviorSubject<boolean>(false);
    private authToken = '';
    private userId = '';
    private userPseudo = '';

    createUser(email: string, password: string, pseudo: string) {
        return this.http.post<{ message: string }>('http://localhost:3000/api/auth/signup', { email: email, password: password, pseudo: pseudo });   
    }

    getToken() {
        return this.authToken;
    }

    getUserId() {
        return this.userId;
    }

    getUserPseudo() {
        return this.userPseudo;
    }

    loginUser(email: string, password: string) {
        return this.http.post<{ userId: string, token: string }>('http://localhost:3000/api/auth/login', { email: email, password: password }).pipe(
            tap(({ userId, token }) => {
                this.userId = userId;
                this.authToken = token;
                console.log(this.authToken);
                
                this.isAuth$.next(true);
            })
        );
    }

    logout() {
        this.authToken = '';
        this.userId = '';
        this.userPseudo = '';
        this.isAuth$.next(false);
        this.router.navigate(['connexion']);
    }
}