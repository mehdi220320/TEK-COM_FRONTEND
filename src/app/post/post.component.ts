import { Component, OnInit } from '@angular/core';
import {File2, Post} from "../Models/Post";
import {Likes} from "../Models/Likes";
import {FileHandle} from "../Models/FileHandle";
import {Comments} from "../Models/Comments";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import{PostService} from '../Services/post.service'
import {NgForm} from "@angular/forms";
import { User } from '../Models/User';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  selectedImageIndex: number = 0;

  constructor(private postService: PostService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const postId = 1; // Replace with dynamic post ID if necessary
    this.postService.getPostById(postId).subscribe(
      (data: Post[]) => {
        this.posts = data.map(post => ({ ...post, selectedImageIndex: 0 })); // Initialize selectedImageIndex
        console.log("Posts with fileList:", this.posts);
      },
      (error) => {
        console.error("Error fetching posts:", error);
      }
    );
  }

  showImage(post: Post, index: number): void {
    post.selectedImageIndex = index;
  }

  getImageUrl(post: Post, index: number): SafeUrl | null {
    if (post.fileList && post.fileList[index]) {
      const file: File2 = post.fileList[index];
      return this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileType};base64,${file.data}`);
    }
    return null;
  }

  getTimeSincePost(dateAjout: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - new Date(dateAjout).getTime();

    const timeIntervals = [
      { label: 'minute', value: 1000 * 60 },
      { label: 'hour', value: 1000 * 60 * 60 },
      { label: 'day', value: 1000 * 60 * 60 * 24 },
      { label: 'year', value: 1000 * 60 * 60 * 24 * 365 }
    ];

    for (let i = 0; i < timeIntervals.length; i++) {
      const { label, value } = timeIntervals[i];
      const intervalValue = Math.floor(timeDifference / value);

      if (intervalValue >= 1) {
        return `${intervalValue} ${label}${intervalValue > 1 ? 's' : ''} ago`;
      }
    }

    return 'Just now';
  }

  toggleComments(post: Post): void {
    post.showComments = !post.showComments;
  }

  createComment(commentForm: NgForm, post: Post): void {
    const com: { description: any; postid: number; username: string } = {
      description: commentForm.value.description,
      username: localStorage.getItem('id') || '',
      postid: post.id,
    };

    this.postService.addComment(com).subscribe(
      (response) => {
        console.log('Comment created successfully:', response);
        commentForm.reset(); // Reset form
      },
      (error) => {
        console.error('Error creating comment:', error);
      }
    );
  }
}
