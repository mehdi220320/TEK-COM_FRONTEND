import { Injectable } from '@angular/core';
import {environement} from "../environement/environement";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  PATH_OF_API = environement.apiBaseUrl;
  requestHeader = new HttpHeaders({"No-Auth": "True"})

  constructor(private httpClient: HttpClient ) {}

  getClasseByID(id: any) {
    const url = `http://localhost:9090/api/v1/student/getclass/${id}`;
    return this.httpClient.get(url, { responseType: 'text' });
  }
}
