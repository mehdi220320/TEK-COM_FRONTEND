import { Component, OnInit } from '@angular/core';
import {FileHandle} from "../../Models/FileHandle";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import{PostService} from "../../Services/post.service";
import {Router} from "@angular/router";
import {CommunityService} from "../../Services/community.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  imageFiles: FileHandle[] = [];
  content: string = '';
  whoposted!: number  ;
  currenturl:string='';
  communityId:string='';
  isMember:boolean=true;
  userID=localStorage.getItem('id');
  constructor(private router:Router, private sanitizer: DomSanitizer, private postService: PostService, private communityService:CommunityService
  ) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      this.whoposted = +storedUserId;
    }

    this.currenturl=this.router.url
    if(this.currenturl!='home'){
      const parts = this.currenturl.split('/');

      this.communityId = parts[2];

      this.communityService.isMember(this.userID,this.communityId).subscribe((response)=>{
        this.isMember=response
      },(error)=>{
        console.error("isMember fonction doesn t work properly")
      })

    }

  }

  addPost(postForm: NgForm) {

    const postData = {
      content: postForm.value['content'],
      whoposted: this.whoposted.toString(),
      community: this.communityId,
      type: "text",
      images: this.imageFiles.map(fileHandle => fileHandle.file)
    };

    // Use the service to create the post
    this.postService.createPost(postData).subscribe(
      (response) => {
        console.log('Post created successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }

  onImageFileSelected(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.imageFiles.push({ file, url });
    }
  }

  removeImageFile(fileHandle: FileHandle): void {
    const index = this.imageFiles.indexOf(fileHandle);
    if (index !== -1) {
      this.imageFiles.splice(index, 1);
    }
  }
}
