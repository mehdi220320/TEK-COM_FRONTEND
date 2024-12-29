import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environement} from "../environement/environement";
import {Observable} from "rxjs";
import {User} from "../Models/User";
interface LoginData {
  email: string;
  password: string;
}
interface forgetpassData{
  newpassword : string;

}
interface forgetData{
  email : string;

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
  public forgetpass2(Forgetpassdata: forgetpassData) {
    const email = localStorage.getItem('email');

    const body = { email , ...Forgetpassdata };
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/forgetpass2", body)
  }
  public forgetpass(ForgetData: forgetData) {
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/forgetpass", ForgetData)
  }
  public getuser2bymail2(email:string): any {
    return this.httpclient.get<any>(`${this.PATH_OF_API}/api/v1/auth/findbymail2/`+email);
  }
}
