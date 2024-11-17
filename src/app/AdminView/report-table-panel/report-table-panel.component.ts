import { Component, OnInit } from '@angular/core';
import { ReportService } from "../../Services/report.service";
import { Report } from "../../Models/Report";
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-report-table-panel',
  templateUrl: './report-table-panel.component.html',
  standalone: true,
  styleUrls: ['./report-table-panel.component.css'],
  imports: [CommonModule, FormsModule], // Import CommonModule here
})
export class ReportTablePanelComponent implements OnInit {

  reports: Report[] = [];
  index=1;
  showNum: number = 10;

  constructor(private reportservice: ReportService) {}

  ngOnInit(): void {
    this.reportservice.getReports().subscribe(
        (response) => {
          this.reports = response;
          console.log(this.reports);
        },
        (error) => {
          console.error(error);
        }
    );
  }

  numViews(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.showNum = Number(target.value);
    this.IndexChange(1);
  }
  getTotIndex(): number[] {
    const totalPages = Math.ceil(this.reports.length / this.showNum);
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }

  nextIndex(){
    const totalPages = Math.ceil(this.reports.length / this.showNum);
    if(totalPages==this.index){
      this.index=1;
    }else{
      this.index++;
    }
  }
  previousIndex(){
    const totalPages = Math.ceil(this.reports.length / this.showNum);
    if(this.index==1){
      this.index=totalPages;
    }else{
      this.index--;
    }
  }
  IndexChange(i:number):void{
    this.index=i;
  }
  tableViews():any[]{
    if(this.index==1){
      return  this.reports.slice(this.index-1,this.index*this.showNum)
    }
    return this.reports.slice((this.index-1)*this.showNum,this.index*this.showNum);
  }
}
