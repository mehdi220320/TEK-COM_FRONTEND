import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../Models/User";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = "http://localhost:9090";
  constructor(private httpClient: HttpClient) { }
  getAllUsers(){
    return this.httpClient.get<User[]>(this.baseUrl+"api/v1/post/posts");
  }

}
