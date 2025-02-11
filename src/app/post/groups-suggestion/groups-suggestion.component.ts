import { Component, OnInit } from '@angular/core';
import {CommunityService} from "../../Services/community.service";
import {Community} from "../../Models/Community";
import {File2, Post} from "../../Models/Post";
import {DomSanitizer} from "@angular/platform-browser";
import {User} from "../../Models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-groups-suggestion',
  templateUrl: './groups-suggestion.component.html',
  styleUrls: ['./groups-suggestion.component.css']
})
export class GroupsSuggestionComponent implements OnInit {
  communities: Community[] = [];
  BestSuggcommunity: Community | undefined;
  BestSuggcommunityMembers:User [] =[];
  constructor(private communityService: CommunityService,private sanitizer:DomSanitizer,private  router:Router) { }
  url:string="";
  ngOnInit(): void {
    this.url=this.router.url
    this.communityService.getSuggestionCommunity(localStorage.getItem('id')).subscribe(
      (data: Community[]) => {
        this.communities = data;
        console.log("Communities fetched:", this.communities);
      },
      (error) => {
        console.error("Error fetching communities:", error);
      }
    );
      this.communityService.getBestSuggestionCommunity(localStorage.getItem('id')).subscribe(
        (response)=>{
          console.log('Community est : ', response)
          this.BestSuggcommunity=response;
          this.communityService.getMembersByCommunityId(response.id).subscribe(
            (response)=>{
              this.BestSuggcommunityMembers=response;
              console.log("el memebers :"+response)
            },(error)=>{
              console.error("Error fetching members :",error)

            }
          )
        },(error)=>{
          console.error("Error fetching best recommendation :",error)
        }
      );

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
  maxCommunities=6
  generated=false
  shuffled:Community[]=[];
  extendmaxCommunities(){
    this.maxCommunities+=5
  }
  generateRandomCommunities(): Community[] {
    if (!this.communities || this.communities.length === 0) {
      console.warn("No communities available to generate random selection.");
      return [];
    }

     const filteredCommunities = this.communities.filter(
      (community) => community.id !== this.BestSuggcommunity?.id
    );
    if(!this.generated)
    {
      this.shuffled = filteredCommunities.sort(() => Math.random() - 0.5);
      this.generated=true
    }
    return this.shuffled.slice(0, this.maxCommunities);
  }
  addMember(){
    this.communityService.addMember(this.BestSuggcommunity?.id,localStorage.getItem('id')).subscribe((response)=>{
      console.log(response)
    },(error)=>{
      console.error("can t add you as a member")
    })
  }

}
