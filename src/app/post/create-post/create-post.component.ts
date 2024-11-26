import { Component, OnInit } from '@angular/core';
import {FileHandle} from "../../Models/FileHandle";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import{PostService} from "../../Services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  imageFiles: FileHandle[] = [];
  content: string = '';
  whoposted!: number  ;

  constructor(
    private sanitizer: DomSanitizer,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // Retrieve `whoposted` from local storage
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      this.whoposted = +storedUserId;
    }
  }

  // Function to add a post with form data
  addPost(postForm: NgForm) {
    // Define the post data object
    const postData = {
      content: postForm.value['content'],
      whoposted: this.whoposted.toString(),
      community: 1,  // Assign the community ID as needed
      type: "text",  // Define the type, can be adjusted if needed
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

  // Handle image file selection and preview
  onImageFileSelected(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.imageFiles.push({ file, url });
    }
  }

  // Remove selected image file
  removeImageFile(fileHandle: FileHandle): void {
    const index = this.imageFiles.indexOf(fileHandle);
    if (index !== -1) {
      this.imageFiles.splice(index, 1);
    }
  }
}
