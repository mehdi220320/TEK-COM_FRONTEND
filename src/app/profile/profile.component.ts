import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommunityService} from "../Services/community.service";
import {DomSanitizer} from "@angular/platform-browser";
import {File2, Post} from "../Models/Post";
import {UserServiceService} from "../Services/user-service.service";
import {User} from "../Models/User";
import {errorContext} from "rxjs/internal/util/errorContext";
import {StudentService} from "../Services/student.service";
import {PostService} from "../Services/post.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: -1,
    nom: "",
    prenom: "",
    usernamez: "",
    email: "",
    isactive: "",
    role: "",
    status: "",
    bio: "",
    image: {
      id: "",
      fileName: "",
      fileType: "",
      data: new Uint8Array
    }
  };
  posts: Post[] = []
  id: string = "";
  job: string = ""

  constructor(private postService: PostService, private route: ActivatedRoute, private userService: UserServiceService, private sanitizer: DomSanitizer, private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.userService.getUserById(this.id).subscribe((response) => {
      this.user = response;
      this.getTheJob(this.user.role)
    }, error => console.error("user profile can t fetch user"));
    this.postService.getuserPosts(this.id).subscribe((response) => {
      this.posts = response;
    }, error => console.error("can t fetch user posts"))
  }

  getTheJob(role: any) {
    console.log("User object:", this.user);
    if (role === 'STUD') {
      console.log("ey STUD el rajel");
      this.studentService.getClasseByID(this.id).subscribe((response) => {
        this.job = response;
        console.log("job", this.job);
      });
    }
  }

  getImageURL(image: any): any {
    if (image === null) {
      return 'assets/images/users/user-1.jpg';
    } else {
      const file: File2 = image;
      return this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileType};base64,${file.data}`);
    }
  }

  getNumberOffiles(): any {
    let  numf = 0;
    for (const post of this.posts) {
      numf+=post.fileList.length
    }
    return numf;
  }
  getNumberOfComments(): any {
    let  numC = 0;
    for (const post of this.posts) {
      numC+=post.commentList.length
    }
    return numC;
  }

}
