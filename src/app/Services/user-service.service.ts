import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../Models/User";
import {environement} from "../environement/environement";
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


}
