import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publication } from '../models/publications.model';
import { Observable, catchError, throwError, tap, Subject, of, mapTo } from 'rxjs';
import { AuthService } from './auth.services';


@Injectable({
    providedIn: 'root'
})
export class PublicationsService {

    publications$ = new Subject<Publication[]>();

    constructor(private http: HttpClient,
        private auth: AuthService) { }


    getAllPublications(): any {
        this.http.get<Publication[]>('http://localhost:3000/api/publications').pipe(
            tap(publications => this.publications$.next(publications)),
            catchError(error => {
                console.log(error);
                console.error(error.error.message);
                return of([]);
            })
        ).subscribe();
    }

    getPublicationById(publicationId: number): Observable<Publication> {
        return this.http.get<Publication>(`http://localhost:3000/api/publications/${publicationId}`).pipe(
            catchError(error => throwError(error.error.message))
        );
    }

    likePublication(id: string, like: boolean) {
        return this.http.post<{ message: string }>(
            'http://localhost:3000/api/publications/' + id + '/like',
            { userId: this.auth.getUserId(), like: like ? 1 : 0 }
        ).pipe(
            mapTo(like),
            catchError(error => throwError(error.error.message))
        );
    }

    createPublication(publication: Publication, image: File) {
        const formData = new FormData();
        console.log(publication);

        formData.append('publication', JSON.stringify(publication));
        if (image) { formData.append('image', image) }
        const authToken = this.auth.getToken();
        console.log(authToken);
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);
        return this.http.post<{ message: string }>('http://localhost:3000/api/publications', formData, { headers: headers }).pipe(
            catchError(error => throwError(error.error.message))
        );
    }

    modifyPublication(id: string, publication: Publication, image: string | File) {
        if (typeof image === 'string') {
            return this.http.put<{ message: string }>('http://localhost:3000/api/publications/' + id, publication).pipe(
                catchError(error => throwError(error.error.message))
            );
        } else {
            const formData = new FormData();
            formData.append('publication', JSON.stringify(publication));
            formData.append('image', image);
            return this.http.put<{ message: string }>('http://localhost:3000/api/publications/' + id, formData).pipe(
                catchError(error => throwError(error.error.message))
            );
        }
    }

    deletePublication(id: string) {
        return this.http.delete<{ message: string }>('http://localhost:3000/api/publications/' + id).pipe(
            catchError(error => throwError(error.error.message))
        );
    }

}