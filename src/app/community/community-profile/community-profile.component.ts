import { Component, OnInit } from '@angular/core';
import {CommunityService} from "../../Services/community.service";
import {Community} from "../../Models/Community";
import {UserServiceService} from "../../Services/user-service.service";
import {File2, Post} from "../../Models/Post";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../Services/post.service";

@Component({
  selector: 'app-community-profile',
  templateUrl: './community-profile.component.html',
  styleUrls: ['./community-profile.component.css']
})
export class CommunityProfileComponent implements OnInit {
  id!: string;
  username :String="";
  community: Community | null | undefined ;
  index=1;
  posts:Post[]=[]
  galery:File2[]=[]
  constructor(private postService: PostService,private route: ActivatedRoute,private communityService:CommunityService,private userService:UserServiceService,private sanitizer:DomSanitizer) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.postService.getPostByCommunityId(this.id).subscribe((response)=>{
      this.posts=response;
      for(let post of this.posts){
        console.log("test2")
        if(post.fileList.length!=0){
          console.log("test3")
          for(let file of post.fileList){
            console.log("test4")
            this.galery.push(file);
            console.log("galery : "+this.galery)
          }
        }
      }
    },(error)=>{
      console.error("Can t fetch posts of community")
    })
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
