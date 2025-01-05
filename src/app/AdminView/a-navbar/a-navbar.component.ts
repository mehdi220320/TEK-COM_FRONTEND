import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CommunityService} from "../../Services/community.service";
import {DomSanitizer} from "@angular/platform-browser";
import {UserServiceService} from "../../Services/user-service.service";
import {UserAuthService} from "../../Services/user-auth.service";

@Component({
  selector: 'app-a-navbar',
  templateUrl: './a-navbar.component.html',
  styleUrls: ['./a-navbar.component.css']
})
export class ANavbarComponent implements OnInit {

  constructor(private router: Router, private communityService: CommunityService, private sanitizer: DomSanitizer
    , private userService: UserServiceService , private userauthservice: UserAuthService

  ) { }

  ngOnInit(): void {
  }
  public onlogout() {



    const token = localStorage.getItem('jwtToken');
    this.userauthservice.clear();
    if (token) {
      this.userService.logout(token).subscribe(
        () => {
          localStorage.removeItem('jwtToken');
     this.router.navigate(['/login']);

        },
        error => console.error(error)
      );
    }
  }
}
