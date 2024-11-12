import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Post} from "../Models/Post";
import {environement} from "../environement/environement";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})
  constructor(private httpClient: HttpClient) { }
  getPostById(id:number) {
    return this.httpClient.get<Post[]>(this.PATH_OF_API+"/api/v1/post/user/"+id);
  }
  createPost(post:any){
    return this.httpClient.post(this.PATH_OF_API + "/api/v1/post/create", post)
  }
  addComment(comment:any){
    return this.httpClient.post(this.PATH_OF_API + "/api/v1/post/addcomment", comment)
  }

}
