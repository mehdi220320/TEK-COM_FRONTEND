import { Injectable } from '@angular/core';
import {environement} from "../environement/environement";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Notification} from "../Models/Notification";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})
  constructor(private httpClient: HttpClient) { }
  getNotificationByUser(id:any):Observable<Notification[]>
  {
    return this.httpClient.get<Notification[]>(this.PATH_OF_API+"/api/v1/notification/userNotifs/"+id);
  }
  updateSeenNotification(id:any):Observable<Notification>{
    return this.httpClient.put<Notification>(`${this.PATH_OF_API}/api/v1/notification/seen/${id}`, { headers: this.requestHeader });
  }
  addNotification(whoreacted: any, post: any, type: any): Observable<string> {
    const requestBody = {
      whoreacted: whoreacted,
      post: post,
      type: type
    };
    return this.httpClient.post<string>(this.PATH_OF_API+"/api/v1/notification/addNotif", requestBody);
  }


}
