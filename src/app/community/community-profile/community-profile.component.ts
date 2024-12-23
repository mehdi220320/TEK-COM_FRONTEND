import { Component, OnInit } from '@angular/core';
import {CommunityService} from "../../Services/community.service";
import {Community} from "../../Models/Community";
import {UserServiceService} from "../../Services/user-service.service";
import {File2, Post} from "../../Models/Post";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
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
  follower !:boolean;
  currentUrl!:string;
  constructor(private router:Router ,private postService: PostService,private route: ActivatedRoute,private communityService:CommunityService,private userService:UserServiceService,private sanitizer:DomSanitizer) { }
  ngOnInit(): void {
    this.currentUrl=this.router.url
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.postService.getPostByCommunityId(this.id).subscribe((response)=>{
      this.posts=response;
      for(let post of this.posts){
        if(post.fileList.length!=0){
          for(let file of post.fileList){
            this.galery.push(file);
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
    this.communityService.isMember(localStorage.getItem('id'),this.id).subscribe((response)=>{
      this.follower=response
    },(error)=>{
      console.error("isMember fonction doesn t work properly")
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
  addMember(){
    this.communityService.addMember(this.id,localStorage.getItem('id')).subscribe((response)=>{
      console.log(response)
    },(error)=>{
      console.error("can t add you as a member")
    })

    console.warn("el member ahawa f sormik "+ this.follower)

  }
  deleteMember(){
    this.communityService.deleteMember(this.id, localStorage.getItem('id')).subscribe(
      (response) => {
        console.log("Member deleted successfully", response);
      },
      (error) => {
        console.error("Error deleting member", error);
      }
    );
  }
}
