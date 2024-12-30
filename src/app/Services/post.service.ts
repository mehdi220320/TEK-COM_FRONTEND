import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Post,File2} from "../Models/Post";
import {environement} from "../environement/environement";
import {Observable} from "rxjs";
import {Community} from "../Models/Community";
import {Comments} from"../Models/Comments"
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
  getPostByUserId(id: string | null) {
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

  addComment(description: any, username: any, postId: any): Observable<Comments> {
    const comment = {
      description,
      username,
      post: postId
    };
    return this.httpClient.post<Comments>(this.PATH_OF_API + "/api/v1/post/addcomment", comment);
  }

  getPostByFile(imageID: any):Observable<Post> {
   return this.httpClient.get<Post>(this.PATH_OF_API+"/api/v1/post/postByImage/"+imageID);
  }

  pressLike(userId: any, postId: any): Observable<any> {
    const payload = {
      userID: userId,
      postid: postId
    };
    return this.httpClient.post(this.PATH_OF_API + "/api/v1/post/pressLike", payload);
  }
  getPostById(id:any):Observable<Post>{
    return this.httpClient.get<Post>(this.PATH_OF_API+"/api/v1/post/"+id+"/info");
  }
  getPostCountsByCommunity(): Observable<Map<string, number>> {
    return this.httpClient.get<Map<string, number>>(this.PATH_OF_API + "/api/v1/post/counts");
  }
  getTopUsersByPostCounts(): Observable<Map<string, number>> {
    return this.httpClient.get<Map<string, number>>(this.PATH_OF_API + "/api/v1/post/top-users");
  }
  getPostCountsByYear(): Observable<Map<number, number>> {
    return this.httpClient.get<Map<number, number>>(this.PATH_OF_API + "/api/v1/post/post-counts-by-year");
  }
  getPostCountsByYearAndMonth(): Observable<Map<string, number>> {
    return this.httpClient.get<Map<string, number>>(this.PATH_OF_API + "/api/v1/post/post-counts-by-year-and-month");
  }
  getactifuserstoken(): Observable<Map<string, number>> {
    return this.httpClient.get<Map<string, number>>(this.PATH_OF_API + "/api/v1/auth/user-login-count");
  }
  getUserCount(): Observable<number> {
    return this.httpClient.get<number>(
      this.PATH_OF_API + '/api/v1/auth/user-count'
    );
  }
  getCommunityCount(): Observable<number> {
    return this.httpClient.get<number>(this.PATH_OF_API + "/api/v1/com/community-count");
  }
  getcommunitiesmembers(): Observable<Map<string, number>> {
    return this.httpClient.get<Map<string, number>>(this.PATH_OF_API + "/api/v1/com/community-member-counts");
  }
}
