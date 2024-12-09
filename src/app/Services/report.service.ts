import { Injectable } from '@angular/core';
import {environement} from "../environement/environement";
import {Report} from "../Models/Report"
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

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
  submitReport(report:any){
    return this.httpClient.post(this.PATH_OF_API + "/api/v1/report/create", report)
  }


  validateReport(reportId: number): Observable<any> {
    return this.httpClient.put<number>(
      `${this.PATH_OF_API}/api/v1/report/ReportValide/${reportId}`,
      { headers: this.requestHeader }
    );
  }


  rejectReport(reportId: number): Observable<number> {
    return this.httpClient.put<number>(`${this.PATH_OF_API}/api/v1/report/ReportNonValider/${reportId}`, { headers: this.requestHeader });
  }

  // DeleteReport(reportId: number): Observable<number> {
  //   return this.httpClient.delete<number>(
  //     `${this.PATH_OF_API}/api/v1/report/DeleteReport/${reportId}`,
  //     { headers: this.requestHeader } // Add headers if necessary
  //   );
  // }

}
