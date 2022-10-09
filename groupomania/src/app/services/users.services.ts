import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../core/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {


    constructor(private http: HttpClient) {}

    private getUsers(): Observable<User[]> {
        return this.http.get<any>(`http://localhost:3000/api/user`);
    };

    private addUser(user: User): Observable<User> {
        return this.http.post<User>(`http://localhost:3000/api/user/signup`, user)
    }

    public updateUser(user: User, userId: string): Observable<User> {
        return this.http.put<User>(`http://localhost:3000/api/user/${userId}`, user,{
            withCredentials: true,
          });
    };

    public deleteUser(userId: string): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/api/user/${userId}`,{
            withCredentials: true,
          });
    };

    public loginUser(user: User): Observable<User> {
        return this.http.post<User>(`http://localhost:3000/api/user/login`, user,{
            withCredentials: true,
          });
    };

    public logoutUser(user: User): Observable<User> {
        return this.http.get<any>(`http://localhost:3000/api/user/logout`,{
            withCredentials: true,
          });
    };

    public followUser(IdFollower: string, IdToFollow: string): Observable<User> {
        return this.http.patch<User>(`http://localhost:3000/api/user/follow/${IdFollower}`, {"idToFollow":IdToFollow},{
            withCredentials: true,
          });
    };

    public unfollowUser(IdUnfollower: string, IdToUnfollow: string): Observable<User> {
        return this.http.patch<User>(`http://localhost:3000/api/user/unfollow/${IdUnfollower}`, {"idToUnfollow":IdToUnfollow},{
            withCredentials: true,
          })
    };
}

