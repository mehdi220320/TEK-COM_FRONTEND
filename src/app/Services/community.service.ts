import { Injectable } from '@angular/core';
import {environement} from "../environement/environement";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})
  constructor(private httpClient:HttpClient ) {}
  createCommunity(community:any){
    return this.httpClient.post(this.PATH_OF_API + "/api/v1/com/addcom", community)
  }


}
