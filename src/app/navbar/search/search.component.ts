import { Component, OnInit } from '@angular/core';
import {File2} from "../../Models/Post";
import {ActivatedRoute, Router} from "@angular/router";
import {CommunityService} from "../../Services/community.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Community} from "../../Models/Community";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery:string ='';
  currentUrl:string='';
  communities:Community[]= [];
  constructor(private route:Router,private router: Router, private communityService: CommunityService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.currentUrl=this.route.url
    const parts = this.currentUrl.split('/');
    this.searchQuery=decodeURIComponent(parts[3])
    this.communityService.getCommunityBySearch(this.searchQuery).subscribe((response)=>{
      this.communities=response;
    },error => {
      console.error("can t fetch communities in search areas ")
    })

  }
  getImageURL(image: any): any {
    if (image === null) {
      return 'assets/images/users/user-1.jpg'; // Default image
    } else {
      const file: File2 = image;
      return this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileType};base64,${file.data}`);
    }
  }
  addMember(id: any) {
    this.communityService.addMember(id, localStorage.getItem('id')).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.error("Can't add you as a member");
    });
  }

  deleteMember(id: any) {
    this.communityService.deleteMember(id, localStorage.getItem('id')).subscribe(
      (response) => {
        console.log("Member deleted successfully", response);
      },
      (error) => {
        console.error("Error deleting member", error);
      }
    );
  }
}
