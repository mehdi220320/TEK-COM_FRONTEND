import { Component, OnInit } from '@angular/core';
import {Community} from "../../Models/Community";
import {CommunityService} from "../../Services/community.service";
import {File2} from "../../Models/Post";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-left-side-nav',
  templateUrl: './left-side-nav.component.html',
  styleUrls: ['./left-side-nav.component.css']
})
export class LeftSideNavComponent implements OnInit {
  communities:Community[]=[];
  index=0;

  constructor(private communityService:CommunityService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.communityService.getCommunitybyUserID(localStorage.getItem('id')).subscribe((response)=>{
      this.communities=response
    },(error)=>{
      console.log("Can t fetch getCommunitybyUserID")
    })
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
