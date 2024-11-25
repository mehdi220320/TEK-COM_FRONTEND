import { Injectable } from '@angular/core';
import {environement} from "../environement/environement";
import {Report} from "../Models/report"
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService  {
  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})

  constructor(private httpClient: HttpClient ) {}

  getReports() {
    return this.httpClient.get<Report[]>(this.PATH_OF_API+"/api/v1/report/reports");
  }
  createReport(report:any){
    return this.httpClient.post(this.PATH_OF_API + "/api/v1/report/create", report)
  }
  deleteReport(id: number){
    return this.httpClient.delete(this.PATH_OF_API + "/api/v1/report/delete"+id)
  }
}




/*
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

  getPostById(id: string | null) {
    return this.httpClient.get<Post[]>(this.PATH_OF_API+"/api/v1/post/user/"+id);
  }
  createPost(post:any){
    return this.httpClient.post(this.PATH_OF_API + "/api/v1/post/create", post)
  }
  addComment(comment:any){
    return this.httpClient.post(this.PATH_OF_API + "/api/v1/post/addcomment", comment)
  }


}

 */
