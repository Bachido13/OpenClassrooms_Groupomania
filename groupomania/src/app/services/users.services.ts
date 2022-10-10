import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../core/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {


    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<any>(`http://localhost:3000/api/user`);
    };

    getUserInfo(userId: string): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/api/user/${userId}`)
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(`http://localhost:3000/api/user/signup`, user)
    }

    updateUser(user: User, userId: string): Observable<User> {
        return this.http.put<User>(`http://localhost:3000/api/user/${userId}`, user);
    };

    deleteUser(userId: string): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/api/user/${userId}`);
    };

    loginUser(user: User): Observable<User> {
        return this.http.post<User>(`http://localhost:3000/api/user/login`, user);
    };

    logoutUser(user: User): Observable<User> {
        return this.http.get<any>(`http://localhost:3000/api/user/logout`);
    };
}

