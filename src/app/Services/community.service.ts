import { Injectable } from '@angular/core';
import {environement} from "../environement/environement";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import{Community} from "../Models/Community";
import {User} from "../Models/User";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})
  constructor(private httpClient:HttpClient ) {}
  createCommunity(community: any): Observable<any> { // Change <String> to <any>
    return this.httpClient.post<any>(this.PATH_OF_API + "/api/v1/com/addcom", community);
  }

  getSuggestionCommunity(id:number):Observable<Community[]>{
    return this.httpClient.get<Community[]>(this.PATH_OF_API+"/api/v1/com/NotMembre/"+id)
  }
  getBestSuggestionCommunity(id:number):Observable<Community>{
    return this.httpClient.get<Community>(this.PATH_OF_API+"/api/v1/com/bestSuggestion/"+id)
  }
  getMembersByCommunityId(id:any):Observable<User[]>{
    return this.httpClient.get<User[]>(this.PATH_OF_API+"/api/v1/com/members/"+id)
  }
  getCommunityById(id:any):Observable<Community>{
    return this.httpClient.get<Community>(this.PATH_OF_API+"/api/v1/com/community/"+id)
  }
}
