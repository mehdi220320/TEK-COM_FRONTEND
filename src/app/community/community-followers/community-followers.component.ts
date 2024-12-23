import { Component, OnInit } from '@angular/core';
import {CommunityService} from "../../Services/community.service";
import {User} from "../../Models/User";
import {Router} from "@angular/router";
import {File2} from "../../Models/Post";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-community-followers',
  templateUrl: './community-followers.component.html',
  styleUrls: ['./community-followers.component.css']
})
export class CommunityFollowersComponent implements OnInit {
  constructor(private sanitizer:DomSanitizer,private router:Router,private communityService:CommunityService) { }
  followers:User[]=[]
  communityId:string="";
  currentRoute:string="";

  ngOnInit(): void {
    this.currentRoute=this.router.url
    const parts = this.currentRoute.split('/');
    this.communityId = parts[2];
    this.communityService.getMembersByCommunityId(this.communityId).subscribe(
      (response)=>{
        this.followers=response;
        console.log("el memebers :"+response)
      },(error)=>{
        console.error("Error fetching members :",error)

      }
    )
  }
  index=0;
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
