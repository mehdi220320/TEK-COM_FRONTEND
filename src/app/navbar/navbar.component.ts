import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommunityService } from "../Services/community.service";
import { Community } from "../Models/Community";
import { File2 } from "../Models/Post";
import { DomSanitizer } from "@angular/platform-browser";
import { User } from "../Models/User";
import { forkJoin, map } from "rxjs";
import {UserServiceService} from "../Services/user-service.service";
import {UserAuthService} from "../Services/user-auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '';
  communitiesWithMembers: any[] = [];
  filteredCommunities: any[] = []; // Array for filtered results
  searchQuery: string = ''; // Property to bind to input

  constructor(private router: Router, private communityService: CommunityService, private sanitizer: DomSanitizer
    , private userService: UserServiceService , private userauthservice: UserAuthService

  ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.communityService.getAllCommunities().subscribe(
      (communitiesResponse) => {
        const communities = communitiesResponse;
        const memberRequests = communities.map(community =>
          this.communityService.getMembersByCommunityId(community.id).pipe(
            map((membersResponse: User[]) => ({
              ...community,
              members: membersResponse
            }))
          )
        );
        forkJoin(memberRequests).subscribe(
          (combinedResponse) => {
            this.communitiesWithMembers = combinedResponse;
            console.log("Communities with Members:", this.communitiesWithMembers);
          },
          (error) => {
            console.error("Error fetching members:", error);
          }
        );
      },
      (error) => {
        console.error("Can't fetch communities in search navbar", error);
      }
    );
  }

  filterCommunities() {
    if (!this.searchQuery) {
      this.filteredCommunities = this.communitiesWithMembers;
      return;
    }
    const queryLower = this.searchQuery.toLowerCase();
    this.filteredCommunities = this.communitiesWithMembers.filter(community =>
      community.title.toLowerCase().includes(queryLower)
    );
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      // this.router.navigate(['home/search/', this.searchQuery]);
      window.location.href = 'http://localhost:4200/home/search/'+this.searchQuery
    }
  }

  checkFollow(users: User[]): boolean {
    return users.some(user => user.id.toString() === localStorage.getItem('id'));
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
  public onlogout() {



    const token = localStorage.getItem('jwtToken');
    this.userauthservice.clear();
    if (token) {
      this.userService.logout(token).subscribe(
        () => {
          localStorage.removeItem('jwtToken');


        },
        error => console.error(error)
      );
    }
  }
}
