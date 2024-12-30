import { Component, OnInit } from '@angular/core';
import { ReportService } from "../../Services/report.service";
import { Report } from "../../Models/Report";
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm} from "@angular/forms";
import {PostService} from "../../Services/post.service";
import {File2, Post} from "../../Models/Post";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-report-table-panel',
  templateUrl: './report-table-panel.component.html',
  standalone: true,
  styleUrls: ['./report-table-panel.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ReportTablePanelComponent implements OnInit {

  reports: Report[] = [];
  index = 1;
  showNum: number = 10;
  post: Post = {
    id: 0,
    date_ajout: new Date(),
    whoposted: '',
    community: '',
    communityID:'',
    content: '',
    isVisible: true,
    commentList: [],
    likeList: [],
    selectedImageIndex: 0,
    showComments: false,
    fileList: []
  };
  inputValue: string = '';
  report : Report ={
    id:-1,
    post:-1,
    cause:"",
    date_ajout: new Date(),
    whoposted:"",
    etat:"",
    description:"",
    whoreported:""
  };
  constructor(
    private reportService: ReportService,private postService:PostService,private sanitizer:DomSanitizer) {}

  ngOnInit(): void {
  this.loadReports();
  }
  loadReports(){
    this.reportService.getReports().subscribe((response)=>{
      this.reports=response;
      this.reports.sort((a, b) => {
        if (a.etat === "Stand-by" && b.etat !== "Stand-by") {
          return -1;
        } else if (a.etat !== "Stand-by" && b.etat === "Stand-by") {
          return 1;
        }
        return 0;
      });
    },(error)=>{
      console.error("can t fetch reports ")
    })
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
  tableViews():Report[]{
    if(this.index==1){
      return  this.reports.slice(this.index-1,this.index*this.showNum)
    }
    return this.reports.slice((this.index-1)*this.showNum,this.index*this.showNum);
  }
  deleteReport(id: number): void {
    let index = this.reports.findIndex(report => report.id === id);
    if (index > -1) {
      this.reportService.DeleteReport(id).subscribe(
        () => {
          console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
          this.reports.splice(index, 1);
        },
        (error) => {
          console.error('Error deleting report:', error);
        }
      );
    }
  }

  validateReport(reportId: number): void {
    this.reportService.validateReport(reportId).subscribe(
      () => {
        const rep = this.reports.find(r => r.id === reportId);
        if(rep){
          this.reports.forEach(r => {
            if (r.post === rep.post) {
              r.etat = "Banned";
            }
          });
        }
        // this.successMessage = `Report with ID ${reportId} validated successfully!`;
        // this.errorMessage = '';
      },
      (error) => {
        console.error('Error validating report:', error);
        // this.errorMessage = `Failed to validate report with ID ${reportId}`;
      }
    );
  }

  rejectReport(reportId: number): void {
    this.reportService.rejectReport(reportId).subscribe(
      () => {
        const rep = this.reports.find(r => r.id === reportId);
        if(rep){
          this.reports.forEach(r => {
            if (r.post === rep.post) {
              r.etat = "Fake";
            }
          });
        }
        // this.successMessage = 'Report rejected successfully!';
        // this.errorMessage = '';

      },
      (error) => {
        // this.errorMessage = 'Error rejecting report. Please try again later.';
        console.error('Error rejecting report:', error);
      }
    );
  }

  getPostById(id: any,report:Report) {
    this.postService.getPostById(id).subscribe((response)=>{
      this.post=response;
      this.post.selectedImageIndex=0
      console.log(response)
    },(error)=>{
      console.error(error)
    })
    this.report=report
  }
  ReinitializePost(){
    this.post = {
      id: 0,
      date_ajout: new Date(),
      whoposted: '',
      community: '',
      communityID:'',
      content: '',
      isVisible: true,
      commentList: [],
      likeList: [],
      selectedImageIndex: 0,
      showComments: false,
      fileList: []
    };
    this.report ={
      id:-1,
      post:-1,
      cause:"",
      date_ajout: new Date(),
      whoposted:"",
      etat:"",
      description:"",
      whoreported:""
    };

  }

  showImage(post: Post, index: number): void {
    post.selectedImageIndex = index;
  }
  getImageUrl(post: Post, index: number): SafeUrl | null {
    if (post.fileList && post.fileList[index]) {
      const file: File2 = post.fileList[index];
      return this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileType};base64,${file.data}`);
    }
    return null;
  }
  getTimeSincePost(dateAjout: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - new Date(dateAjout).getTime();

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    return 'Just now';
  }
  getImageURL(image:any):any{
    if(image===null)
      if(this.index++%2==1)
        return  'assets/images/background/img.png'
      else
        return 'assets/images/users/user-1.jpg'
    else {
      const file: File2 = image;
      return this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileType};base64,${file.data}`);
    }
  }

}
