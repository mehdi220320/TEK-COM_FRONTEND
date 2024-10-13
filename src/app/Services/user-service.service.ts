import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../Models/User";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }
  baseUrl = "http://localhost:8088";
  getAllUsers(){
    return this.httpClient.get<User[]>(this.baseUrl+"/api/users");
  }
}
