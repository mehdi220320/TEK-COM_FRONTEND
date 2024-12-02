import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Post,File2} from "../Models/Post";
import {environement} from "../environement/environement";
import {Observable} from "rxjs";
import {Community} from "../Models/Community";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})
  constructor(private httpClient: HttpClient) { }

  getPostByCommunityId(id: string | null) {
    return this.httpClient.get<Post[]>(this.PATH_OF_API+"/api/v1/post/community/"+id);
  }
  getPostById(id: string | null) {
    return this.httpClient.get<Post[]>(this.PATH_OF_API+"/api/v1/post/user/"+id);
  }
  createPost(postData: any): Observable<any> {
    const formData = new FormData();
    formData.append('whoposted', postData.whoposted.toString());
    formData.append('community', postData.community.toString());
    formData.append('content', postData.content);
    formData.append('type', postData.type);

    // Append each image file to FormData
    postData.images.forEach((file: File) => {
      formData.append('images', file, file.name);
    });

    return this.httpClient.post(`${this.PATH_OF_API}/api/v1/post/addpost`, formData);
  }

  addComment(comment:any){
    return this.httpClient.post(this.PATH_OF_API + "/api/v1/post/addcomment", comment)
  }
  getPostByFile(imageID: any):Observable<Post> {
   return this.httpClient.get<Post>(this.PATH_OF_API+"/api/v1/post/postByImage/"+imageID);
  }

}
