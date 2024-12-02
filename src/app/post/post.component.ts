import { Component, OnInit } from '@angular/core';
import {File2, Post} from "../Models/Post";
import {Likes} from "../Models/Likes";
import {FileHandle} from "../Models/FileHandle";
import {Comments} from "../Models/Comments";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import{PostService} from '../Services/post.service'
import {NgForm} from "@angular/forms";
import { User } from '../Models/User';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  selectedImageIndex: number = 0;
  currentRoute: string = '';
  constructor(private postService: PostService, private sanitizer: DomSanitizer,private activatedRoute:ActivatedRoute,private router:Router) {}


  ngOnInit(): void {
    this.currentRoute = this.router.url;
    // console.warn(this.currentRoute)
    this.loadPosts();
  }

  loadPosts(): void {
    if(this.currentRoute==="/home"){
      this.postService.getPostById(localStorage.getItem('id')).subscribe(
        (data: Post[]) => {
          this.posts = data.map(post => ({ ...post, selectedImageIndex: 0 }));
          console.log("Posts with fileList:", this.posts);
        },
        (error) => {
          console.error("Error fetching posts:", error);
        }
      );
    }
    else {
      const parts = this.currentRoute.split('/'); // Split the URL by '/'
      const communityId = parts[2];
      this.postService.getPostByCommunityId(communityId).subscribe(
        (data: Post[]) => {
          this.posts = data.map(post => ({ ...post, selectedImageIndex: 0 }));
          console.log("Posts with fileList:", this.posts);
        },
        (error) => {
          console.error("Error fetching posts:", error);
        }
      );
    }
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

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    return 'Just now';
  }

  toggleComments(post: Post): void {
    post.showComments = !post.showComments;
  }
  inputValue: string = '';

  createComment(commentForm: NgForm, post: Post): void {
    const com: { description: any; date:Date;post: number; username: string } = {
      description: commentForm.value.description,
      date: new Date(),
      username: localStorage.getItem('id') || '',
      post: post.id
    };
    console.log(com)
    this.postService.addComment(com).subscribe(
      (response) => {
        console.log('Comment created successfully:', response);
        commentForm.reset("");
        this.posts=[];
        this.loadPosts();
      },
      (error) => {
        console.error('Error creating comment:', error);
      }
    );
  }


  redirectToReport(postId: number) {
    debugger;
    this.router.navigate(['/reportpost'], { queryParams: { postId } });
  }

}
