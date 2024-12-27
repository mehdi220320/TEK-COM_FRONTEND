import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environement} from "../environement/environement";
import {Observable} from "rxjs";
import {User} from "../Models/User";
interface LoginData {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})

  constructor(private httpclient: HttpClient ) {
  }

  public login(loginData: LoginData) {
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/authenticate", loginData)
  }
  public getUsernameById(id: any): Observable<string> {
    return this.httpclient.get<string>(`${this.PATH_OF_API}/api/v1/user/username/${id}`, { responseType: 'text' as 'json' });
  }
  public getAll():Observable<User[]>{
    return  this.httpclient.get<User[]>(this.PATH_OF_API + "/api/v1/auth/users")
  }
}
