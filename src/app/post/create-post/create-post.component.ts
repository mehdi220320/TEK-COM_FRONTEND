import { Component, OnInit } from '@angular/core';
import {FileHandle} from "../../Models/FileHandle";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import{PostService} from "../../Services/post.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  fileHandle: FileHandle[] =[];

  constructor(private sanitizer: DomSanitizer,
              private postService:PostService) {}

  ngOnInit(): void {
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.fileHandle.push({ file, url });
    }
  }
  removeFileSelected(file:FileHandle){
    let index = this.fileHandle.indexOf(file);
    if (index !== -1) {
      this.fileHandle.splice(index, 1);
    }
  }

  createPost(postForm: NgForm) {
    console.log(postForm.value);

    const description = postForm.value['description'];

    const post = {
      whoposted: 1,
      community: 1,
      content: description,
      type: "text"
    };

    this.postService.createPost(post).subscribe(
      (response) => {
        console.log('Post created successfully:', response);
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }


}
