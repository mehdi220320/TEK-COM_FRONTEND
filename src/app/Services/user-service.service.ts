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
interface registerData{
  id: string;
  nom : string;
  prenom: string;
  email: string;
  password: string;
  role : string ;
  classse: string;
  bio: string;
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
  public register(RegisterData: registerData) {
    const formData = new FormData();
    formData.append('nom', RegisterData.nom );
    formData.append('prenom',  RegisterData.prenom );
    formData.append('email',  RegisterData.email);
    formData.append('role',  RegisterData.role);

    formData.append('classse', RegisterData.classse );
    formData.append('bio',  RegisterData.bio);
    console.log(RegisterData)
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/register", RegisterData)
  }
  public getUserById(id:any):Observable<User>{
    return  this.httpclient.get<User>(this.PATH_OF_API + "/api/v1/auth/find2/"+id)
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
  public logout(token : string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/logout", null,{headers})
  }
  public updateUser(user:User,job:any):Observable<User>{
    const formData = new FormData();
    formData.append('nom', user.nom );
    formData.append('prenom', user.prenom );
    formData.append('email', user.email);
    formData.append('usernamez', user.usernamez);
    formData.append('classse',job );
    formData.append('bio', user.bio);
    return this.httpclient.put<User>(this.PATH_OF_API + "/api/v1/auth/update/"+user.id, formData)
  }
}
