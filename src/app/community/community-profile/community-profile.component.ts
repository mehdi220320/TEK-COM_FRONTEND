import { Component, OnInit } from '@angular/core';
import {CommunityService} from "../../Services/community.service";
import {Community} from "../../Models/Community";
import {UserServiceService} from "../../Services/user-service.service";
import {File2} from "../../Models/Post";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-community-profile',
  templateUrl: './community-profile.component.html',
  styleUrls: ['./community-profile.component.css']
})
export class CommunityProfileComponent implements OnInit {
  id:number =1;
  username :String="";
  community: Community | null | undefined ;
  index=1;

  constructor(private communityService:CommunityService,private userService:UserServiceService,private sanitizer:DomSanitizer) { }
  ngOnInit(): void {
    this.communityService.getCommunityById(this.id).subscribe((response) => {
      this.community = response;
      this.userService.getUsernameById(this.community.usercreate).subscribe((response) => {
        this.username = response;
      }, (error) => {
        console.error('Error fetching username:', error);
      });
    }, (error) => {
      console.error('Error fetching community:', error);
      this.community = null;
    });
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
